<script setup lang="ts">
import {definePageMeta} from "#imports";
import {blogPosts} from "~/data/blogPosts";
import {useJsonLd} from "~/composeables/useJsonLd";

const post = blogPosts.find((item) => item.slug === 'move-mysql-innodb-table-to-another-disk')!
const siteUrl = 'https://shahabgohar.dev'
const articleUrl = `${siteUrl}/blogs/${post.slug}/`
const articleImage = `${siteUrl}/img/og-image.png`
const seoTitle = 'How to Move a MySQL InnoDB Table to Another Disk (Safely)'
const seoDescription =
  'How I moved a 136 GB InnoDB table off a 94% full production disk to another volume with zero data loss, using MySQL 8.0 innodb_directories, the supported way, not a symlink.'

definePageMeta({
  title: post.title
})

// Code snippets live as constants so MySQL/bash formatting (indentation,
// line breaks, the '<' in the DELETE) renders exactly as written.
const codePrep = `mkdir -p /mnt/data-volume/mysql-data/app_prod
chown -R mysql:mysql /mnt/data-volume/mysql-data
chmod 750 /mnt/data-volume/mysql-data /mnt/data-volume/mysql-data/app_prod`

const codeApparmor = `/mnt/data-volume/mysql-data/ r,
/mnt/data-volume/mysql-data/** rwk,`

const codeApparmorReload = `apparmor_parser -r /etc/apparmor.d/usr.sbin.mysqld`

const codeCnf = `[mysqld]
innodb_directories = "/mnt/data-volume/mysql-data"`

const codeSystemd = `[Unit]
RequiresMountsFor=/mnt/data-volume`

const codeCutover = `# Clean shutdown so every dirty page is flushed and no crash recovery is needed
mysql -e "SET GLOBAL innodb_fast_shutdown=0;"
systemctl stop mysql

# mv copies to the target and unlinks the source ONLY after the copy fully
# succeeds, so the original is never at risk mid-transfer. (~136 GB, ~11 min.)
mv /var/lib/mysql/app_prod/call_transcripts.ibd \\
   /mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd

chown mysql:mysql /mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd
chmod 640         /mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd

systemctl start mysql`

const codeVerify = `-- The recorded path now points at the data volume
SELECT t.SPACE, t.NAME, d.PATH
FROM information_schema.INNODB_TABLESPACES t
JOIN information_schema.INNODB_DATAFILES d USING(SPACE)
WHERE t.NAME = 'app_prod/call_transcripts';
-- returns: 348 | app_prod/call_transcripts | /mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd

-- Table reads fine and the blob comes back intact
SELECT id, call_id, LENGTH(transcript) FROM call_transcripts LIMIT 1;`

const codeRollback = `systemctl stop mysql
mv /mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd \\
   /var/lib/mysql/app_prod/call_transcripts.ibd
chown mysql:mysql /var/lib/mysql/app_prod/call_transcripts.ibd
# remove the innodb_directories line from mysqld.cnf, then:
systemctl start mysql`

const codeIndex = `ALTER TABLE call_transcripts ADD INDEX idx_call_transcripts_date_entered (date_entered);`

const codeDelete = `DELETE FROM call_transcripts WHERE date_entered < (UTC_TIMESTAMP() - INTERVAL 3 DAY)`

useHead({
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { name: 'author', content: 'Shahab Gohar' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: articleUrl },
    { property: 'og:image', content: articleImage },
    { property: 'article:published_time', content: post.datePublished },
    { property: 'article:modified_time', content: post.dateModified },
    { property: 'article:author', content: 'Shahab Gohar' },
    { property: 'article:section', content: post.category },
    ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seoTitle },
    { name: 'twitter:description', content: seoDescription },
    { name: 'twitter:image', content: articleImage }
  ],
  link: [
    { rel: 'canonical', href: articleUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl
        },
        headline: post.title,
        description: seoDescription,
        image: [articleImage],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        articleSection: post.category,
        keywords: post.tags.join(', '),
        wordCount: 2300,
        timeRequired: 'PT11M',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl,
          jobTitle: 'Software Engineer',
          knowsAbout: [
            'MySQL',
            'InnoDB',
            'Database administration',
            'Linux',
            'DevOps',
            'Business automation'
          ]
        },
        publisher: {
          '@type': 'Person',
          name: 'Shahab Gohar',
          url: siteUrl
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Portfolio',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogs',
            item: `${siteUrl}/blogs/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: articleUrl
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I symlink a MySQL .ibd file to another disk?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, not safely for a single file-per-table tablespace. InnoDB rewrites the .ibd file on operations like OPTIMIZE, ALTER, and TRUNCATE, which replaces your symlink with a fresh real file back on the original disk and silently refills it. Crash recovery and backup tooling also do not expect symlinked tablespaces. The supported approach in MySQL 8.0 is innodb_directories.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I move a single InnoDB table to another disk in MySQL 8.0?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Stop the whole MySQL instance cleanly, move the table’s .ibd file to a directory named after its schema on the target disk, register that directory in innodb_directories, then restart. At startup InnoDB matches the file by the space_id in its header and updates the data dictionary to the new path.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does moving an InnoDB tablespace require downtime?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Even for one table, the file can only be moved safely while the entire MySQL instance is stopped, so the whole database is down for the duration of the copy. Moving a 136 GB file across volumes took about 11 minutes in this case; plan downtime around your file size and disk speed.'
            }
          },
          {
            '@type': 'Question',
            name: 'Will the relocation survive a MySQL restart and future ALTER statements?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, as long as innodb_directories stays in the configuration permanently. InnoDB rescans those directories at every startup and locates the tablespace by its space_id, and the data dictionary already records the new path. Remove that config line and InnoDB cannot find the file during recovery.'
            }
          },
          {
            '@type': 'Question',
            name: 'What happens if the same .ibd file exists in two places?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MySQL refuses to start. If the startup scan finds two files with the same tablespace ID, it fails with an error about duplicate tablespace files. That is why you move the file with mv rather than copy it, and never leave a copy behind in the old datadir.'
            }
          }
        ]
      })
    }
  ]
})
useJsonLd()

const sections = [
  { id: 'incident', label: 'The incident' },
  { id: 'diagnosis', label: 'What filled it' },
  { id: 'not-a-symlink', label: 'Not a symlink' },
  { id: 'innodb-directories', label: 'innodb_directories' },
  { id: 'procedure', label: 'The procedure' },
  { id: 'result', label: 'The result' },
  { id: 'rollback', label: 'Rollback' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'faq', label: 'FAQ' },
  { id: 'work-with-me', label: 'Work with me' }
]
</script>

<template>
  <main class="min-h-screen bg-secondary text-primary">
    <article class="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr] lg:px-16">
      <aside class="lg:sticky lg:top-8 lg:h-fit">
        <NuxtLink to="/blogs/" class="inline-flex items-center gap-2 font-ibmMono text-sm text-primary/65 transition hover:text-info">
          <Icon name="mdi:arrow-left" size="18" />
          All posts
        </NuxtLink>

        <nav class="mt-10 hidden border-l border-primary/10 pl-5 lg:block">
          <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-primary/45">Navigate</p>
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="mt-4 block text-sm text-primary/60 transition hover:text-info"
          >
            {{ section.label }}
          </a>
        </nav>
      </aside>

      <div>
        <header class="border-b border-primary/10 pb-10">
          <div class="flex flex-wrap items-center gap-3 font-ibmMono text-xs uppercase tracking-[0.18em] text-primary/55">
            <span>{{ post.category }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.date }}</span>
            <span class="h-1 w-1 rounded-full bg-info"></span>
            <span>{{ post.readingTime }}</span>
          </div>

          <h1 class="mt-5 max-w-4xl font-grotesk text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {{ post.title }}
          </h1>
          <p class="mt-6 max-w-3xl text-xl leading-9 text-primary/70">
            The root disk was at 94% with a few hours to spare before an army of voice agents started dialing. Here's how I moved the single biggest InnoDB table onto a spare volume with zero data loss, using the method MySQL actually supports.
          </p>
        </header>

        <div class="prose-content max-w-3xl py-10">
          <section id="incident">
            <p class="lead">
              At 2 a.m. the production root filesystem sat at 94% full: 22 GB free on a 338 GB volume, and still climbing. In a few hours an army of voice agents, dozens of them, each running a different script, was scheduled to start dialing, and every call they place writes to the same database. There wasn't enough free space to take a backup before touching anything, and the disk would fill on its own long before I could resize it.
            </p>
            <p>
              One thing saved the night. A second, nearly empty data volume was already mounted on the box, roughly 294 GB free and doing almost nothing. The plan wrote itself: get the biggest table off the root disk and onto that volume, without deleting a single row and without the risky shortcut most people reach for first. Below is exactly what I did, why the obvious trick would have quietly blown up, and the supported path that held.
            </p>
          </section>

          <section id="diagnosis">
            <h2>What was actually eating the disk</h2>
            <p>
              Before moving anything, I wanted to know precisely where the space had gone. One database, <code>app_prod</code>, accounted for 264 GB of the 303 GB in use, and inside it two InnoDB tables did nearly all the damage:
            </p>
            <div class="not-prose my-8 overflow-x-auto">
              <table class="w-full border-collapse text-left text-sm">
                <thead>
                  <tr class="border-b border-primary/20 font-ibmMono text-xs uppercase tracking-[0.14em] text-primary/60">
                    <th class="py-3 pr-4 font-medium">Table</th>
                    <th class="py-3 pr-4 font-medium">On-disk .ibd</th>
                    <th class="py-3 pr-4 font-medium">Rows</th>
                    <th class="py-3 pr-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody class="align-top">
                  <tr class="border-b border-primary/10">
                    <td class="py-4 pr-4 font-semibold text-info">call_transcripts</td>
                    <td class="py-4 pr-4 font-semibold">136 GB</td>
                    <td class="py-4 pr-4 text-primary/75">~4.7 M</td>
                    <td class="py-4 pr-4 text-primary/65">one TEXT transcript blob per call</td>
                  </tr>
                  <tr>
                    <td class="py-4 pr-4 font-semibold text-info">call_records</td>
                    <td class="py-4 pr-4 font-semibold">112 GB</td>
                    <td class="py-4 pr-4 text-primary/75">~33 M</td>
                    <td class="py-4 pr-4 text-primary/65">index-heavy, most of it is indexes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <code>call_transcripts</code> alone was about 40% of the entire root disk. It takes in roughly 35 to 40 GB a day and gets trimmed back to a three-day window by a nightly retention job, so it's huge but bounded. That made it the obvious thing to relocate: move just its <code>.ibd</code> file onto the spare volume and the root disk breathes again, no data touched. The question was how to do it without corrupting anything.
            </p>
          </section>

          <section id="not-a-symlink">
            <h2>Why not just symlink it</h2>
            <p>
              The first idea everyone has is to move the file and drop a symlink in its place. Don't. Symlinking an individual InnoDB <code>.ibd</code> file is unsupported and genuinely unsafe.
            </p>
            <p>
              InnoDB rebuilds the tablespace file during a number of ordinary operations, <code>OPTIMIZE</code>, some <code>ALTER</code>s, <code>TRUNCATE</code>. When it does, it deletes your symlink and writes a fresh, real file back in the original location, silently refilling the disk you were trying to protect, usually at the worst possible moment. Crash recovery and most backup tools don't expect a symlinked tablespace either. MySQL tolerates symlinking a whole database directory, but never a single tablespace file. It's the kind of fix that works in the demo and detonates a week later in production.
            </p>
            <p>
              There's a proper mechanism for this, and it has existed since MySQL 8.0: <code>innodb_directories</code>.
            </p>
          </section>

          <section id="innodb-directories">
            <h2>The supported way: innodb_directories</h2>
            <p>
              InnoDB doesn't identify a tablespace by its path. It identifies it by a <code>space_id</code> baked into the file header. At startup, InnoDB scans the data directory plus any directories listed in <code>innodb_directories</code>, matches each <code>.ibd</code> to its tablespace by that <code>space_id</code>, and updates the recorded path in the data dictionary. Because the dictionary is rewritten to the new location, the move survives restarts and later DDL. This is the behavior the MySQL 8.0 manual documents for moving tablespace files while the server is offline.
            </p>
            <p>
              Two rules matter, and both bite if you ignore them. First, the directory has to stay in the config permanently, InnoDB needs it at every startup to locate the file, and without it recovery can't find the tablespace. Second, a file-per-table <code>.ibd</code> can only be moved into a directory whose name matches its schema. Our table lives in the <code>app_prod</code> schema, so the destination had to be <code>.../mysql-data/app_prod/</code>, not just any folder. Miss that and InnoDB won't adopt the file.
            </p>
            <p>
              For this move the specifics were:
            </p>
            <ul>
              <li>Tablespace <code>app_prod/call_transcripts</code>, <code>space_id = 348</code> on this instance (yours will differ).</li>
              <li>Old path: <code>/var/lib/mysql/app_prod/call_transcripts.ibd</code></li>
              <li>New path: <code>/mnt/data-volume/mysql-data/app_prod/call_transcripts.ibd</code></li>
            </ul>
          </section>

          <section id="procedure">
            <h2>The procedure</h2>
            <p>
              Two phases. Everything that can be prepared with the server running, I did first, so the actual downtime was only the file copy.
            </p>

            <h3>Prep, with zero downtime</h3>
            <p>
              Create the destination on the data volume, owned by <code>mysql</code>, using the schema-named subdirectory:
            </p>
            <pre class="code-block"><code>{{ codePrep }}</code></pre>
            <p>
              Then the gotcha almost no tutorial mentions: on Ubuntu, <code>mysqld</code> runs under an <strong>AppArmor</strong> profile. If the new path isn't whitelisted, MySQL is denied access and simply fails to start, with an error that sends you looking in the wrong place for an hour. Add the paths to <code>/etc/apparmor.d/local/usr.sbin.mysqld</code> (which the main profile includes):
            </p>
            <pre class="code-block"><code>{{ codeApparmor }}</code></pre>
            <pre class="code-block"><code>{{ codeApparmorReload }}</code></pre>
            <p>
              Register the new directory in <code>/etc/mysql/mysql.conf.d/mysqld.cnf</code> under <code>[mysqld]</code>. This takes effect on the next restart and has to stay there for good:
            </p>
            <pre class="code-block"><code>{{ codeCnf }}</code></pre>
            <p>
              One more reboot-safety detail. The volume is mounted via <code>/etc/fstab</code> with <code>nofail</code>, which means on boot MySQL could start before the mount is ready and then fail to find its tablespace. A small systemd drop-in at <code>/etc/systemd/system/mysql.service.d/require-datavolume.conf</code> forces the ordering:
            </p>
            <pre class="code-block"><code>{{ codeSystemd }}</code></pre>
            <p>
              Follow that with <code>systemctl daemon-reload</code> so the drop-in is picked up. Nothing so far has touched the running database.
            </p>

            <h3>Cutover, about 11 minutes of downtime</h3>
            <p>
              Here's the honest cost: moving one table still means stopping the whole instance. The file can only be moved safely while MySQL is fully offline, so the portal is down for the length of the copy. I did a clean shutdown first so all dirty pages flush and there's no crash recovery to sit through on the way back up.
            </p>
            <pre class="code-block"><code>{{ codeCutover }}</code></pre>
            <p>
              The choice of <code>mv</code> over <code>cp</code> is deliberate and load-bearing. A cross-volume <code>mv</code> copies to the target and only unlinks the source after the copy fully succeeds, so the original is never at risk mid-transfer. It also guarantees the file ends up in exactly one place, which is the whole game: if InnoDB's startup scan ever finds two files with the same <code>space_id</code>, it refuses to start. Never leave a copy behind in the old datadir.
            </p>

            <h3>Verify</h3>
            <p>
              After MySQL came back up, I confirmed the data dictionary points at the volume and the blob reads back intact:
            </p>
            <pre class="code-block"><code>{{ codeVerify }}</code></pre>
            <p>
              The error log showed a clean start, "ready for connections", with no tablespace warnings. The voice agents started on schedule.
            </p>
          </section>

          <section id="result">
            <h2>The result</h2>
            <div class="not-prose my-8 overflow-x-auto">
              <table class="w-full border-collapse text-left text-sm">
                <thead>
                  <tr class="border-b border-primary/20 font-ibmMono text-xs uppercase tracking-[0.14em] text-primary/60">
                    <th class="py-3 pr-4 font-medium">Metric</th>
                    <th class="py-3 pr-4 font-medium">Before</th>
                    <th class="py-3 pr-4 font-medium">After</th>
                  </tr>
                </thead>
                <tbody class="align-top">
                  <tr class="border-b border-primary/10">
                    <td class="py-4 pr-4 font-semibold">Root <code>/</code> used</td>
                    <td class="py-4 pr-4 text-primary/75">303 GB (94%)</td>
                    <td class="py-4 pr-4 font-semibold text-info">167 GB (52%)</td>
                  </tr>
                  <tr class="border-b border-primary/10">
                    <td class="py-4 pr-4 font-semibold">Root <code>/</code> free</td>
                    <td class="py-4 pr-4 text-primary/75">22 GB</td>
                    <td class="py-4 pr-4 font-semibold text-info">157 GB</td>
                  </tr>
                  <tr>
                    <td class="py-4 pr-4 font-semibold"><code>call_transcripts.ibd</code></td>
                    <td class="py-4 pr-4 text-primary/75">on root disk</td>
                    <td class="py-4 pr-4 font-semibold text-info">on data volume</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              From 94% to 52% by moving a single file, with the database serving traffic again after roughly 11 minutes down and not one row deleted.
            </p>
          </section>

          <section id="rollback">
            <h2>Rollback, if it goes sideways</h2>
            <p>
              The reason this is safe to attempt on a bad night: the data is only ever in one place, so backing out is symmetrical. If MySQL fails to start after the move, stop it, move the file home, drop the config line, and start again.
            </p>
            <pre class="code-block"><code>{{ codeRollback }}</code></pre>
          </section>

          <section id="lessons">
            <h2>Lessons and follow-ups</h2>
            <p>
              This bought headroom; it isn't a cure. A few things I noted for the days after, and they're the parts worth stealing whether or not you ever relocate a tablespace.
            </p>
            <p>
              <strong>It's headroom, not a fix.</strong> The other 112 GB table and the ongoing 35 to 40 GB a day of churn still live on the root disk. The root will climb again. Keep watching <code>df -h /</code> and plan the real capacity work rather than treating the move as the end of it.
            </p>
            <p>
              <strong>Index the retention delete.</strong> The nightly job that trims the table to three days runs a delete keyed on <code>date_entered</code>:
            </p>
            <pre class="code-block"><code>{{ codeDelete }}</code></pre>
            <p>
              That column had no index, so the delete was a full table scan across roughly 4.7 million rows every night, which is both slow and a needless load spike. The fix is a safe online DDL:
            </p>
            <pre class="code-block"><code>{{ codeIndex }}</code></pre>
            <p>
              Batching the delete in chunks (a loop of <code>DELETE ... LIMIT 5000</code>) also keeps undo and redo from spiking on a big purge. And once a tablespace is relocated, be careful with casual <code>OPTIMIZE</code> or <code>ALTER</code> rebuilds on it until you've confirmed they respect <code>innodb_directories</code>, the same rebuild behavior that makes symlinks unsafe is worth a second thought here too.
            </p>
          </section>

          <section id="faq">
            <h2>Frequently asked questions</h2>
            <h3>Can I symlink a MySQL .ibd file to another disk?</h3>
            <p>
              No, not safely for a single tablespace. InnoDB rewrites the <code>.ibd</code> on operations like <code>OPTIMIZE</code>, <code>ALTER</code>, and <code>TRUNCATE</code>, which replaces the symlink with a fresh real file back on the original disk and silently refills it. Use <code>innodb_directories</code> instead.
            </p>
            <h3>How do I move a single InnoDB table to another disk in MySQL 8.0?</h3>
            <p>
              Stop the instance cleanly, move the <code>.ibd</code> into a directory named after its schema on the target disk, register that directory in <code>innodb_directories</code>, and restart. InnoDB matches the file by its <code>space_id</code> and updates the data dictionary to the new path.
            </p>
            <h3>Does moving an InnoDB tablespace require downtime?</h3>
            <p>
              Yes. Even for one table the file can only be moved while the whole instance is stopped, so the database is down for the length of the copy. Here, 136 GB across volumes took about 11 minutes.
            </p>
            <h3>Will the move survive a restart and future ALTERs?</h3>
            <p>
              Yes, provided <code>innodb_directories</code> stays in the config permanently. InnoDB rescans it at every startup and finds the tablespace by <code>space_id</code>. Remove that line and recovery can't locate the file.
            </p>
            <h3>What if the .ibd ends up in two places?</h3>
            <p>
              MySQL won't start. If the scan finds two files with the same <code>space_id</code>, it errors out on duplicate tablespaces. That's exactly why you <code>mv</code> the file instead of copying it.
            </p>
          </section>

          <section id="work-with-me" class="not-prose mt-12 border border-info/50 bg-info/5 p-6 sm:p-8">
            <p class="font-ibmMono text-xs uppercase tracking-[0.22em] text-info">Work with me</p>
            <h2 class="mt-4 text-3xl font-bold leading-tight">The person you want when production is on fire</h2>
            <p class="mt-4 text-base leading-7 text-primary/70">
              This is the work I do: keep real systems alive under a deadline, without hand-waving and without losing data. I build and run automation, CRM, and AI platforms for small teams, MySQL and SuiteCRM, Mautic, voice and AI agents, and the boring infrastructure that keeps them from falling over at 2 a.m. If that's who you need, let's talk.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:shahab.developer.work@gmail.com?subject=Production%20systems%20help"
                class="inline-flex items-center gap-2 bg-info px-5 py-3 font-ibmMono text-sm text-secondary transition hover:opacity-90"
              >
                Discuss a project
                <Icon name="mdi:email-outline" size="18" />
              </a>
              <NuxtLink
                to="/projects/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                See the projects
                <Icon name="mdi:arrow-top-right" size="18" />
              </NuxtLink>
              <NuxtLink
                to="/blogs/how-to-get-into-ai-automation/"
                class="inline-flex items-center gap-2 border border-primary/15 px-5 py-3 font-ibmMono text-sm text-primary/75 transition hover:border-info hover:text-info"
              >
                Getting into AI automation
                <Icon name="mdi:arrow-right" size="18" />
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
.prose-content {
  font-size: 1.0625rem;
  line-height: 1.9;
}

.prose-content section {
  scroll-margin-top: 2rem;
}

.prose-content section + section {
  margin-top: 3rem;
}

.prose-content h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.9rem, 5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.08;
}

.prose-content h3 {
  margin-top: 2rem;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
}

.prose-content p {
  margin-top: 1rem;
  color: color-mix(in srgb, currentColor 72%, transparent);
}

.prose-content ul {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.9rem;
  padding-left: 1.25rem;
  list-style: disc;
  color: color-mix(in srgb, currentColor 74%, transparent);
}

.prose-content li::marker {
  color: var(--fallback-in, oklch(var(--in)));
}

.prose-content .lead {
  margin-top: 0;
  font-size: 1.35rem;
  line-height: 1.7;
  color: currentColor;
}

/* Inline code */
.prose-content :not(pre) > code {
  font-family: 'IBM Plex Mono', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85em;
  padding: 0.12em 0.38em;
  border-radius: 3px;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: var(--fallback-in, oklch(var(--in)));
  word-break: break-word;
}

/* Code blocks */
.prose-content .code-block {
  margin-top: 1.25rem;
  overflow-x: auto;
  padding: 1rem 1.15rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
  background: color-mix(in srgb, currentColor 4%, transparent);
}

.prose-content .code-block code {
  display: block;
  font-family: 'IBM Plex Mono', 'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.84rem;
  line-height: 1.7;
  white-space: pre;
  color: color-mix(in srgb, currentColor 88%, transparent);
}

.prose-content table th,
.prose-content table td {
  vertical-align: top;
}
</style>

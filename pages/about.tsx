import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Page } from '~/lib/utility/page'
import { PV } from '~/resources'
import { getServerSideAuthenticatedUserInfo } from '~/services/auth'
import { getServerSideUserQueueItems } from '~/services/userQueueItem'
import { ColumnsWrapper, DownloadAppButtons, PageHeader, PageScrollableContent, SideContent } from '~/components'

interface ServerProps extends Page { }

const keyPrefix = 'pages_about'

export default function About(props: ServerProps) {
  const { t } = useTranslation()
  const pageTitle = t('About')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader text={t('About')} />
      <PageScrollableContent>
        <ColumnsWrapper
          mainColumnChildren={
            <div className='text-page'>
              <p className='bigger'>
                Podverse is an open source podcast manager for iOS, Android, and web.
              </p>
              <label>Free features:</label>
              <ul>
                <li>Subscribe to podcasts</li>
                <li>Auto-download episodes</li>
                <li>Drag-and-drop queue</li>
                <li>Sleep timer</li>
                <li>Light / Dark mode</li>
              </ul>
              <label>Premium features:</label>
              <ul>
                <li>Create and share podcast clips</li>
                <li>Switch devices and play from where you left off</li>
                <li>Sync your subscriptions across devices</li>
                <li>Sync your queue across devices</li>
                <li>Create and share playlists</li>
                <li>Subscribe to playlists</li>
              </ul>
              <p>
                All Podverse software is provided under a free and open source (FOSS) licence.
                Features that require updating our servers are available only with a Premium membership.
                Sign up today and get 1 year of Premium for free <span role='img' aria-label='partying face emoji'>🥳</span>
              </p>
              <DownloadAppButtons />
              <hr />
              <h3>Team</h3>
              <p>Mitch Downey</p>
              <p>Creon Creonopoulos</p>
              <p>Gary Johnson</p>
              <p>Kyle Downey</p>
            </div>
          }
          sideColumnChildren={<SideContent />}
        />
      </PageScrollableContent>
    </>
  )
}

/* Server-Side Logic */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, locale } = ctx
  const { cookies } = req

  const userInfo = await getServerSideAuthenticatedUserInfo(cookies)
  const userQueueItems = await getServerSideUserQueueItems(cookies)

  const serverProps: ServerProps = {
    serverUserInfo: userInfo,
    serverUserQueueItems: userQueueItems,
    ...(await serverSideTranslations(locale, PV.i18n.fileNames.all)),
    serverCookies: cookies
  }

  return { props: serverProps }
}

import { lazy, ReactNode, Suspense } from 'react'
import Fallback from 'pages/fallback'

const WrappedSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Fallback />}>{children}</Suspense>
)

const RawHome = lazy(() => import('pages/home'))
const RawBlog = lazy(() => import('pages/blog'))
const RawMainBlogs = lazy(() => import('pages/mainBlogs'))
const RawEditProfile = lazy(() => import('pages/editProfile'))
const RawCreateBlog = lazy(() => import('pages/createBlog'))

export const Home = () => (
  <WrappedSuspense>
    <RawHome />
  </WrappedSuspense>
)

export const Blog = () => (
  <WrappedSuspense>
    <RawBlog />
  </WrappedSuspense>
)

export const MainBlogs = () => (
  <WrappedSuspense>
    <RawMainBlogs />
  </WrappedSuspense>
)

export const EditProfile = () => (
  <WrappedSuspense>
    <RawEditProfile />
  </WrappedSuspense>
)

export const CreateBlog = () => (
  <WrappedSuspense>
    <RawCreateBlog />
  </WrappedSuspense>
)

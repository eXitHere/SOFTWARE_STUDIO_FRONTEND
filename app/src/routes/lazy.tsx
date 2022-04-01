import { lazy, ReactNode, Suspense } from 'react'
import Fallback from 'pages/fallback'

const WrappedSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Fallback />}>{children}</Suspense>
)

const RawHome = lazy(() => import('pages/home'))
const RawBlog = lazy(() => import('pages/blog'))
const RawBlogs = lazy(() => import('pages/blogs'))

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

export const Blogs = () => (
  <WrappedSuspense>
    <RawBlogs />
  </WrappedSuspense>
)

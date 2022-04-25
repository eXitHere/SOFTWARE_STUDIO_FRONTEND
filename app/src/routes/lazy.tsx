import { lazy, ReactNode, Suspense } from 'react'

import Fallback from 'pages/fallback'

const WrappedSuspense = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<Fallback />}>{children}</Suspense>
)

const RawHome = lazy(() => import('pages/home'))
const RawBlog = lazy(() => import('pages/blog'))
const RawMainBlogs = lazy(() => import('pages/mainBlogs'))
const RawEditBlog= lazy(() => import('pages/editBlog'))
const RawEditProfile = lazy(() => import('pages/editProfile'))
const RawCreateBlog = lazy(() => import('pages/createBlog'))
const RawProfile = lazy(() => import('pages/profile'))
const RawLogin = lazy(() => import('pages/login'))
const RawRegister = lazy(() => import('pages/register'))
const RawMap = lazy(() => import('pages/map'))
const RawMoon = lazy(() => import('pages/moon'))

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

export const EditBlog = () => (
  <WrappedSuspense>
    <RawEditBlog />
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

export const Profile = () => (
  <WrappedSuspense>
    <RawProfile />
  </WrappedSuspense>
)

export const Login = () => (
  <WrappedSuspense>
    <RawLogin />
  </WrappedSuspense>
)

export const Register = () => (
  <WrappedSuspense>
    <RawRegister />
  </WrappedSuspense>
)

export const Map = () => (
  <WrappedSuspense>
    <RawMap />
  </WrappedSuspense>
)

export const Moon = () => (
  <WrappedSuspense>
    <RawMoon />
  </WrappedSuspense>
)



// import pages
import { Homepage } from "../Homepage";
import { EmailVerifyPage } from "../pages/auth/EmailVerifyPage";
import { ForgetPage } from "../pages/auth/ForgetPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { ResetPass } from "../pages/auth/ResetPass";
import { SignupPage } from "../pages/auth/SignupPage";
import { VerifyForgetPage } from "../pages/auth/VerifyForgetPage";
import { About } from "../pages/public/About";
import { Blog } from "../pages/public/Blog";
import { BlogDetail } from "../pages/public/BlogDetail";
import { Buynow } from "../pages/public/Buynow";
import { Cart } from "../pages/public/Cart";
import { Checkout } from "../pages/public/Checkout";
import { ContactUs } from "../pages/public/ContactUs";
import { NotFound } from "../pages/public/NotFound";
import { PaymentFail } from "../pages/public/PaymentFail";
import { PaymentSuccess } from "../pages/public/PaymentSuccess";
import { PaymentSuccessPaynow } from "../pages/public/PaymentSuccessPaynow";
import { ProductDetail } from "../pages/public/ProductDetail";
import { Shop } from "../pages/public/Shop";
import { Unauthorize } from "../pages/public/Unauthorize";
import {
  LoggedWrapper,
  ResetPassWrapper,
  VerifyEmailForgetWrapper,
  VerifyEmailSignupWrapper,
  GuestWrapper,
} from "./LoggedWrapper";
export const publicRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: (
      <LoggedWrapper>
        <LoginPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoggedWrapper>
        <SignupPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/verify-signup",
    element: (
      <VerifyEmailSignupWrapper>
        <EmailVerifyPage />
      </VerifyEmailSignupWrapper>
    ),
  },
  {
    path: "/forget",
    element: (
      <LoggedWrapper>
        <ForgetPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/verify-forget-pass",
    element: (
      <VerifyEmailForgetWrapper>
        <VerifyForgetPage />
      </VerifyEmailForgetWrapper>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ResetPassWrapper>
        <ResetPass />
      </ResetPassWrapper>
    ),
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/successbuy",
    element: <PaymentSuccessPaynow />,
  },
  {
    path: "/payment/cancel",
    element: <PaymentFail />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/category/:cateId",
    element: <Shop />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <ContactUs />,
  },
  {
    path: "/blogdetail/:blogId",
    element: <BlogDetail />,
  },
  {
    path: "/productdetail/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: (
      <GuestWrapper>
        <Cart />
      </GuestWrapper>
    ),
  },
  {
    path: "/checkout",
    element: (
      <GuestWrapper>
        <Checkout />
      </GuestWrapper>
    ),
  },
  {
    path: "/buynow/:productId",
    element: (
      <GuestWrapper>
        <Buynow />
      </GuestWrapper>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/not-authorized",
    element: <Unauthorize />,
  },
];

import FlickeringGrid from "@/components/ui/flickering-grid";
import Footer from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import Testimonial from "@/components/ui/testimonial";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <Testimonial />
      <div className="relative min-h-48 items-center flex w-full bg-background overflow-hidden p-4 rounded-2xl">
        <FlickeringGrid
          className="-z-2 absolute inset-0 size-full p-4 opacity-50"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="px-4 flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center w-full mb-8">
          <p className="text-3xl font-medium italic">Get the App</p>
          <div className="w-full md:w-auto justify-center items-center  gap-2 flex flex-row space-y-0 space-x-4">
            <a href="#" className="w-full sm:w-auto flex bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
              <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                </path>
              </svg>
              <div className="text-left">
                <div className="mb-1 text-xs hidden md:block">Download on the</div>
                <div className="-mt-1 font-sans text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a href="#"
              className="w-full sm:w-auto flex bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
              <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                </path>
              </svg>
              <div className="text-left">
                <div className="mb-1 text-xs hidden md:block">Get in on</div>
                <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="px-4 mb-4">
      <div className="bg-sky-100 rounded-2xl p-3">
          <p className="mb-3 text-sky-900">All TIMSCDR students, this one&apos;s for you! Whether you&apos;re looking to make new friends, find a study buddy, join a project team, or even just keep things casual, Tinder for TIMSCDR has got you covered. With a unique platform designed specifically for students like you, it&apos;s the perfect place to connect with peers and build meaningful connections that last beyond the classroom.</p>
          <p className="mb-3 text-sky-900">Life at TIMSCDR is fast-paced, and we know meeting people in person isn&apos;t always easy. That&apos;s where Tinder for TIMSCDR comes in! Join a community of classmates ready to meet someone just like you – whether you&apos;re looking for friendships, project partners, or just someone to chat with about your favorite interests. From tech enthusiasts and future entrepreneurs to art lovers and gamers, there&apos;s a match for everyone here.</p>
          <p className="mb-3 text-sky-900">So, are you ready to make the most of your campus life? Connect with like-minded peers, make new memories, and enjoy everything Tinder for TIMSCDR has to offer. It&apos;s not just an app – it&apos;s a whole new way to experience TIMSCDR.</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

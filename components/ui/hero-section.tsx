"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto w-full p-4">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Welcome to Tinder for TIMSCDR!
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Your journey at TIMSCDR is about more than academics—it&apos;s about meeting new people, finding study buddies, collaborating on exciting projects, and making memories that last a lifetime.
          </p>
        </div>
        <Image
          src="/mockup-2.png"
          width={180}
          height={180}
          alt="linear demo image"
          className="absolute -right-1 grayscale filter sm:-bottom-14 md:-bottom-4 object-contain rounded-md"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-rose-200">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-rose-900">
        Make New Friends, One Swipe at a Time
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-rose-800">
        Tinder for TIMSCDR is designed exclusively for students like you to connect with peers who share your passions, goals, and dreams.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] bg-pink-200">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-pink-800">
          Join Tinder for TIMSCDR today, and start building memories and friendships that last a lifetime!
          </h2>
          <p className="mt-4 max-w-[30rem] text-left  text-base/6 text-pink-700">
          From study sessions to institute events and everything in between, find friends who want to experience campus life just like you. Connect with people attending the same events, joining the same clubs, or sharing similar hobbies.
          </p>
        </div>
        <Image
          src="/mockup-3.png"
          width={250}
          height={250}
          alt="linear demo image"
          className="absolute md:-right-1 -right-16 -bottom-20 h-1/2 md:h-full md:-bottom-14 object-contain rounded-md"
        />
      </WobbleCard>
    </div>
  );
}

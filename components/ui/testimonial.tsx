import React from 'react'
import { InfiniteMovingCards } from './infinite-moving-cards'

function Testimonial() {
    return (
        <div className='px-4'>
            <div className="h-auto rounded-2xl flex flex-col antialiased bg-orange-200 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                    pauseOnHover={false}
                />
            </div>
        </div>
    )
}

export default Testimonial

const testimonials = [
    {
        quote:
            "Connecting with classmates has never been easier! I found a great study partner for my final exams, and it made a huge difference.",
        name: "Aarav Singh",
        title: "Computer Science, TIMSCDR",
    },
    {
        quote:
            "I was initially hesitant, but Tinder for TIMSCDR helped me meet people with the same interests. Now I have friends to collaborate on projects and even hang out on campus.",
        name: "Sneha Patel",
        title: "Information Technology, TIMSCDR",
    },
    {
        quote: "Thanks to this app, I connected with amazing people who share my passion for coding and hackathons!",
        name: "Rohan Mehta",
        title: "Electronics & Communication, TIMSCDR",
    },
    {
        quote:
            "Tinder for TIMSCDR helped me find friends to attend institute events with and also helped me network with alumni. I highly recommend it!",
        name: "Pooja Deshmukh",
        title: "Management Studies, TIMSCDR",
    },
    {
        quote:
            "This app made my first year so much better. I found friends in my department and people with similar hobbies!",
        name: "Karan Joshi",
        title: "Computer Science, TIMSCDR",
    },
];

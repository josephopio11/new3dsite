"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Circle } from "lucide-react";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          // markers: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
          trigger: component.current,
          // immediateRender: true,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as={"div"}>
        <Heading size="xl" as="h2" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.techitems.map(({ tech_colour, tech_name }, index) => (
        <div
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          key={index}
          aria-label={tech_name || undefined}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{
                  color: index === 7 && tech_colour ? tech_colour : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <Circle className="size-10" />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;

"use client";
import React, { useState } from "react";
import Heading from "./common/ui/Heading";
import Text from "./common/ui/Text";
import Cta from "./common/ui/Cta";
import useOutsideClick from "@/utils/useOutsideClick";
import Icons from "./common/Icons";

const Dummy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const refOutSide = useOutsideClick(() => setIsVisible(false));
  return (
    <div
      className="space-x-3 space-y-3 container mx-auto py-10
    ">
      <Heading as="h1" variant="primary">
        Hello World as h1
      </Heading>
      <Heading as="h2" variant="secondary">
        Hello World as h2
      </Heading>
      <Heading as="h3">Hello World as h3</Heading>
      <Text>Hello World Text as &lt;p&gt; tag</Text>
      <Text
        className="p-1 m-2 inline-block border border-red-500 border-solid"
        as="span">
        Hello World Text as &lt;span&gt;
      </Text>
      <Text as="a" href="#dummy" target="_blank" className="underline">
        Hello World Text as &lt;a&gt; tag
      </Text>
      <br />
      <Cta> Cta as &lt;button&gt; tag</Cta>

      <Cta as="a" href="#page">
        Cta as &lt;a&gt; tag
      </Cta>
      <br />
      <div ref={refOutSide}>
        <Cta onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide" : "Show"} Text
        </Cta>
        {isVisible && (
          <div className="border border-solid border-white p-4 ">
            <Text>Well Done Now Click Outside of Box to Close/Hide box</Text>
          </div>
        )}
      </div>
      <Icons className="size-4" name="first" />
    </div>
  );
};

export default Dummy;

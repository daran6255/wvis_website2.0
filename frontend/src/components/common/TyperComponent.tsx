"use client";
import { Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TyperComponentProps {
  strings?: string[];
  typingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const defaultStrings = ["Innovation", "Inclusion", "Impact"];

export default function TyperComponent({
  strings = defaultStrings,
  typingSpeed = 100,
  pauseTime = 1500,
  className,
}: TyperComponentProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = strings[currentWordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      // typing
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, typingSpeed / 2);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      // pause at full word
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText.length === 0) {
      // move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, strings, currentWordIndex, typingSpeed, pauseTime]);

  return (
    <Heading
      py={5}
      as="h1" 
      size="2xl"
      bgGradient="linear(to-r, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)"
      bgClip="text"
      fontWeight="semibold"
      className={className}
    >
      {displayedText}
      <Text as="span" color="teal.400">
        |
      </Text>
    </Heading>
  );
}

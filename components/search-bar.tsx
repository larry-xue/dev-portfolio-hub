"use client";

import type { ListItem } from "@/app/list/page";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";

import HomeButtons from "./home-buttons";

import { SearchIcon } from "@/components/icons";

type SearchResult = {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
  results: ListItem[];
};

const SearchResults = ({
  data,
  highlight,
}: {
  data: SearchResult;
  highlight: string;
}) => {
  return (
    <div className="flex gap-2 w-full flex-wrap mt-10 justify-center">
      {data.results.map((item, idx) => {
        const splitList = String(item.name.toLowerCase())
          .split(String(highlight).toLowerCase())
          .filter((t) => !!t);

        return (
          <Link
            key={item.href}
            isBlock
            color="success"
            href={item.href}
            isDisabled={item.href === "#"}
            target="_blank"
          >
            {splitList.length > 1
              ? splitList.map((word, idx2) => {
                  return (
                    <span key={`${idx}_${word}_${idx2}`} className="text-sm">
                      {word}
                      {idx2 !== splitList.length - 1 && (
                        <span className="text-secondary">{highlight}</span>
                      )}
                    </span>
                  );
                })
              : item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default function SearchBar() {
  const [results, setResults] = useState<SearchResult>({
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    },
    results: [],
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState("");

  const handleSearch = async () => {
    const _input = input.trim();

    if (!_input || loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/fuzzy?name=${_input}`);
      const data = await response.json();

      setResults({
        ...data,
        results: data.results.length
          ? data.results
          : [{ name: "No results found :(", href: "#" }],
      });
      if (data.results.length) {
        setHighlight(_input);
      } else {
        setHighlight("0.0");
      }
    } catch (err) {
      setHighlight("");
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Input
        aria-label="Search"
        autoComplete="off"
        className="max-w-4xl"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Button
            isIconOnly
            disabled={loading}
            isLoading={loading}
            variant="light"
            onClick={handleSearch}
          >
            <SearchIcon className="text-base text-default-400 flex-shrink-0" />
          </Button>
        }
        labelPlacement="outside"
        placeholder="Fuzzy search, e.g. 'Larry'"
        type="search"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />

      <HomeButtons />

      <SearchResults data={results} highlight={highlight} />
    </>
  );
}

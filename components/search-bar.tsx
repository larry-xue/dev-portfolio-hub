"use client"

import { Input } from "@nextui-org/input";
import {
  SearchIcon,
} from "@/components/icons";
import { Button } from "@nextui-org/button";
import HomeButtons from "./home-buttons";
import type { ListItem } from "@/app/list/page";
import { Link } from "@nextui-org/link";
import { useState } from "react";

type SearchResult = {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  },
  results: ListItem[]
}

const SearchResults = ({ data, highlight }: { data: SearchResult, highlight: string }) => {
  if (data.results.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p>No results found</p>
      </div>
    )
  }

  return (
    <div className="flex gap-2 w-full flex-wrap mt-10 justify-center">
      {
        data.results.map((item, idx) => {
          return (
            <Link
              key={item.href}
              isBlock
              href={item.href}
              target="_blank"
              color="success"
              isDisabled={item.href === "#"}
            >
              {item.name.split(highlight).map((word, idx2) => {
                return <span key={`${idx}_${word}_${idx2}`} className="text-sm">
                  {word}
                  <span className="text-secondary">{highlight}</span>
                </span>
              })}
            </Link>
          )
        })
      }
    </div>
  )
}

export default function SearchBar() {
  const [results, setResults] = useState<SearchResult>({
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0
    },
    results: []
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
        results: data.results.length ? data.results : [{ name: "No results found :(", href: "#" }],
      });
      if (data.results.length) {
        setHighlight(_input);
      } else {
        setHighlight("");
      }
    } catch (err) {
      setHighlight("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <Input
        className="max-w-4xl"
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        autoComplete="off"
        labelPlacement="outside"
        placeholder="Fuzzy search, e.g. 'Larry'"
        endContent={
          <Button isIconOnly variant="light" onClick={handleSearch} disabled={loading} isLoading={loading}>
            <SearchIcon className="text-base text-default-400 flex-shrink-0" />
          </Button>
        }
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
        type="search"
      />

      <HomeButtons />

      <SearchResults data={results} highlight={highlight} />
    </>
  )
}

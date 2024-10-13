"use client";

import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";

export type ListItem = {
  name: string;
  href: string;
};

export default function List() {
  const [listByAlphabet, setListByAlphabet] = useState<Map<string, ListItem[]>>(
    new Map(),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/list").then(async (res) => {
      const list = await res.json();
      const listMap = new Map<string, ListItem>();

      list.forEach((item: ListItem) => {
        listMap.set(item.href, item);
      });

      const filteredList = Array.from(listMap.values());

      const alphabetMap = new Map<string, ListItem[]>();

      filteredList.map((itm) => {
        alphabetMap.set(itm.name[0], [
          ...(alphabetMap.get(itm.name[0]) || []),
          itm,
        ]);
      });

      setListByAlphabet(alphabetMap);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center mt-40">
      <div className="flex flex-col items-center justify-center space-y-4">

        <div className="spinner-border animate-spin h-8 w-8 border-4 border-t-green-500 rounded-full"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {Array.from(listByAlphabet.entries()).map(([key, value]) => {
        return (
          <div key={key} className="w-full">
            <Link className="text-lg mb-2 text-gray-400 pl-2">{key}</Link>
            <div className="text-sm w-full flex gap-2 flex-wrap">
              {value.map((item) => {
                return (
                  <Link
                    key={item.href + item.name}
                    isBlock
                    color="success"
                    href={item.href}
                    target="_blank"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

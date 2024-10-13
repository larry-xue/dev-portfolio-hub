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

  useEffect(() => {
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
    });
  }, []);

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

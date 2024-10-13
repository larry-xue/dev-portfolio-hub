'use client';
import {
  SparklesIcon,
  PlusAddIcon,
} from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export default function HomeButtons() {
  const [loading, setLoading] = useState(false);

  const getRandom = () => {
    setLoading(true);
    fetch('/api/random').then(async res => {
      const data = await res.json();
      if (data.length > 0) {
        window.open(data[0].href, '_blank');
      }
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="flex gap-4">
      <Button color="success" startContent={<PlusAddIcon />} onClick={() => alert('Sorry, this feature is not implemented yet')}>Add Your Site</Button>
      <Button variant="bordered" startContent={!loading && <SparklesIcon />} onClick={getRandom} isLoading={loading}>Random</Button>
    </div>
  );
}

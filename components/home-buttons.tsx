"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";

import { SparklesIcon, PlusAddIcon } from "@/components/icons";

export default function HomeButtons() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRandom = () => {
    setLoading(true);
    fetch("/api/random")
      .then(async (res) => {
        const data = await res.json();

        if (data.length > 0) {
          window.open(data[0].href, "_blank");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex gap-4">
      <Button
        color="success"
        startContent={<PlusAddIcon />}
        onClick={handleOpenModal}
      >
        Add Your Site
      </Button>
      <Button
        isLoading={loading}
        startContent={!loading && <SparklesIcon />}
        variant="bordered"
        onClick={getRandom}
      >
        Random
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Your Site
              </ModalHeader>
              <ModalBody>
                <p>
                  This feature is still under development. Please{" "}
                  <Link
                    showAnchorIcon
                    color="success"
                    href="https://larryxue.dev/contact"
                    target="_blank"
                  >
                    contact
                  </Link>{" "}
                  me with your information, and I will add it to the list.
                </p>
                <Code>
                  <code># Syntax</code>
                  <pre>
                    <code>
                      name: your name
                      <br />
                      href: your link
                    </code>
                  </pre>
                </Code>
              </ModalBody>
              <ModalFooter>
                <Button onPress={() => setIsModalOpen(false)}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

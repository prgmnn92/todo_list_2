"use client";
import React from "react";
import useLoginModal from "../hooks/useLoginModal";

import Button from "./Button";
import Container from "./Container";

const LoginView = () => {
  const loginModal = useLoginModal();

  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <div className="min-h-[85vh] flex justify-center items-center">
          <div className="max-w-[250px] min-w-[100px]">
            <Button
              onClick={loginModal.onOpen}
              label="Login to access your Dashboard"
            />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default LoginView;

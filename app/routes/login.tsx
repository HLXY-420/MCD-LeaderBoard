import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from "@nextui-org/modal";
import { Button, Input } from "@nextui-org/react";
import { Form, useActionData } from "@remix-run/react";
import { Mail } from "iconoir-react";
import React from "react";
import { useMemo, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export default function Login() {
    const [value, setValue] = useState<string>("");
    const res = useActionData();

    const validateEmail = (email: string) => {
        return String(email)
            .match(
                /^[A-Za-z0-9._%+-]+@i\.pkuschool\.edu\.cn$/
        );
    };

    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return !validateEmail(value);
    }, [value]);

    return (
        <div className="flex items-center justify-center">
            <Modal isOpen={true} placement="center" isDismissable={false} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <Form method="post">
                        <ModalHeader className="flex flex-col gap-1">登录</ModalHeader>
                        <ModalBody>
                            <Input
                                value={value}
                                onValueChange={setValue}
                                autoFocus
                                isRequired
                                isClearable
                                isInvalid={isInvalid}
                                color={isInvalid ? "danger" : value === "" ? "default" : "success"}
                                endContent={<Mail />}
                                label="邮箱"
                                type="email"
                                name="email"
                                placeholder="请输入你的邮箱"
                                errorMessage="请输入正确的邮箱"
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                登录
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
            </ModalContent>
        </Modal>
        </div>
    );
}

export async function action({ request }: ActionFunctionArgs) {
    await authenticator.authenticate("user", request, {
        successRedirect: "/",
        failureRedirect: "/login",
    });
}

export async function loader({ request }: LoaderFunctionArgs) {
    return await authenticator.isAuthenticated(request, {
        successRedirect: "/",
    });
}

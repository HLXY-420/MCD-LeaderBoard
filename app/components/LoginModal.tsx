import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from "@nextui-org/modal";
import { Button, Input } from "@nextui-org/react";
import { Mail } from "iconoir-react";
import { useMemo, useState } from "react";

export function LoginModal({ isOpen, onOpenChange }: any) {
    const [value, setValue] = useState<string>("");

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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" isDismissable={false}>
            <ModalContent>
                {(onClose) => (
                    <>
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
                                placeholder="请输入你的邮箱"
                                errorMessage="请输入正确的邮箱"
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                登录
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
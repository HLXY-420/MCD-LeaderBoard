import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button
} from "@nextui-org/react";
import { Form, useNavigate } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export default function Logout() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center">
            <Modal isOpen={true} placement="center" isDismissable={false} backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <Form method="post">
                        <ModalHeader className="flex flex-col gap-1">登出</ModalHeader>
                        <ModalBody>
                            <p>确定要登出吗?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => navigate(-2)}>
                                取消
                            </Button>
                            <Button color="primary" type="submit">
                                登出
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
    return await authenticator.logout(request, { redirectTo: "/login" });
}
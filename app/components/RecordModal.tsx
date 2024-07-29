import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";

export function RecordModal({ isOpen, onOpenChange }: any) {
    // When it's too long, add scrollBehavior="outside"
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">提交新记录</ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                关闭
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                提交
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
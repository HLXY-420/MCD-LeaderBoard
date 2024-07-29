import { IconoirProvider, HomeSimple, ProfileCircle, PlusCircle, SunLight, HalfMoon, CloudBookmark, NewTab } from "iconoir-react";
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Button,
    Image,
    Divider,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure
} from "@nextui-org/react";
import { Dock, DockIcon } from "./ui/Dock";
import { RecordModal } from "./RecordModal";

export function SiteContainer({ children }: { children: React.ReactNode }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div>
            <Navbar position="static" height={"5em"}>
                <NavbarBrand>
                    <a href="https://subit.org.cn" target="_blank">
                        <Image
                            isZoomed
                            width={64}
                            alt="SubIT Logo"
                            src="../SubIT-Isolated@256.png"
                        />
                    </a>
                    <a href="https://subit.org.cn" target="_blank" className="font-bold text-inherit text-2xl">SubIT</a>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button isIconOnly variant="light" color="default">
                            <HalfMoon width={"2.5em"} height={"2.5em"} strokeWidth={1.5} />
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}
            <RecordModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <IconoirProvider
                iconProps={{
                    color: "black",
                    strokeWidth: 1.5,
                    width: "5em",
                    height: "5em",
                    
                }}
            >
                <div className="fixed bottom-12 w-full items-center justify-center">
                    <Dock direction="middle" magnification={70} distance={100}>
                        <DockIcon>
                            <Button isIconOnly variant="light" color="default">
                                <HomeSimple />
                            </Button>
                        </DockIcon>
                        <DockIcon>
                            <Button isIconOnly variant="light" color="default">
                                <ProfileCircle />
                            </Button>
                        </DockIcon>
                        <Divider orientation="vertical" />
                        <DockIcon>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly variant="light" color="default">
                                        <PlusCircle />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu disabledKeys={["create"]}>
                                    <DropdownItem
                                        key="submit"
                                        startContent={<CloudBookmark width={"1.5em"} height={"1.5em"} />}
                                        onPress={onOpen}
                                    >
                                        提交新记录
                                    </DropdownItem>
                                    <DropdownItem
                                        key="create"
                                        description="开发中，敬请期待~"
                                        startContent={<NewTab width={"1.5em"} height={"1.5em"} />}
                                    >
                                        创建新赛道
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DockIcon>
                    </Dock>
                </div>
            </IconoirProvider>
        </div>
    )
}
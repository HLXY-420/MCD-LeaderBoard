import { IconoirProvider, HomeSimple, ProfileCircle, PlusCircle, SunLight, HalfMoon, CloudBookmark, NewTab, LogIn, PasswordCursor, LogOut } from "iconoir-react";
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
    useDisclosure,
    Avatar
} from "@nextui-org/react";
import { Dock, DockIcon } from "./ui/Dock";
import { RecordModal } from "./RecordModal";
import { Link } from "@remix-run/react";

export function SiteContainer({ user, children }: { user: any, children: React.ReactNode }) {
    const { isOpen: isRecordOpen, onOpen: onRecordOpen, onOpenChange: onRecordOpenChange } = useDisclosure();

    return (
        <div>
            <Navbar position="static" height={"5em"}>
                <NavbarBrand className="space-x-2">
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
                        <Button isIconOnly variant="light" color="default" isDisabled>
                            <HalfMoon width={"2.5em"} height={"2.5em"} strokeWidth={1.5} />
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {children}
            <RecordModal isOpen={isRecordOpen} onOpenChange={onRecordOpenChange} />
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
                            <Button isIconOnly variant="light" color="default" as={Link} to="/">
                                <HomeSimple />
                            </Button>
                        </DockIcon>
                        <DockIcon>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly variant={(user && user.imageUrl) ? "light" : "bordered"} color="default">
                                        {(user && user.imageUrl) ? <Image src={user.imageUrl} alt="Profile" /> : <ProfileCircle />}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu disabledKeys={["changepassword"]}>
                                    <DropdownItem
                                        key="login"
                                        startContent={user ? "" : <LogIn width={"1.5em"} height={"1.5em"} />}
                                        as={Link}
                                        // @ts-ignore
                                        to="/login"
                                    >
                                        {user ? user.username : "登录"}
                                    </DropdownItem>
                                    <DropdownItem
                                        key="changepassword"
                                        description="开发中，敬请期待~"
                                        startContent={<PasswordCursor width={"1.5em"} height={"1.5em"} />}
                                    >
                                        修改密码
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        startContent={<LogOut width={"1.5em"} height={"1.5em"} color="danger"/>}
                                        color="danger"
                                        className="text-danger"
                                        as={Link}
                                        // @ts-ignore
                                        to="/logout"
                                    >
                                        登出
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
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
                                        onPress={onRecordOpen}
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
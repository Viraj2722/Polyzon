import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BotMessageSquare } from "lucide-react";

const ChatBot = () => {
    return (
        <div className="fixed bottom-[30px] right-7 z-50">
            <Sheet >
                <SheetTrigger asChild>
                    <Button variant="outline" className='rounded-full h-[60px] w-[60px] bg-zinc-100 hover:bg-zinc-200 shadow-2xl border  border-zinc-200'><BotMessageSquare /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Ask Anything</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ChatBot
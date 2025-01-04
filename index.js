To automatically close the sidebar when navigating to a new path, you can make use of the `usePathname` hook from Next.js to detect the current path and trigger the closing of the sidebar based on that. You need to programmatically control the opening and closing of the `Sheet` component by using a state to manage its visibility.

Here’s how you can update your code to automatically close the sidebar when a navigation link is clicked:

### 1. **Add a state for controlling the sidebar visibility**
You’ll need a piece of state to control whether the sidebar is open or not. You can use the `useState` hook to do this.

### 2. **Listen to the pathname change**
You can listen for a change in the pathname using the `usePathname` hook and close the sidebar if the path changes.

### Updated **`Mobilenavigation`** component:

```javascript
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Nav from './Nav';
import Logo from './Logo';
import { AlignJustify } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Mobilenavigation = () => {
    // State to control whether the sidebar is open or closed
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    // Close the sidebar when the path changes
    useEffect(() => {
        setIsOpen(false);
    }, [path]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <AlignJustify 
                    className='cursor-pointer'
                    onClick={() => setIsOpen(true)}  // Open sidebar on click
                />
            </SheetTrigger>
            <SheetContent>
                <div className='flex flex-col items-center justify-between h-full py-8'>
                    <div className='flex flex-col items-center gap-y-32'>
                        <Logo />
                        <Nav 
                            containerStyles='flex flex-col items-center gap-y-6'
                            linkStyles='text-1xl font-semibold'
                            onLinkClick={() => setIsOpen(false)}  // Close sidebar on link click
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Mobilenavigation;
```

### Updated **`Nav`** component:

Now you need to modify the `Nav` component to close the sidebar when any link is clicked. You can pass a new prop `onLinkClick` that will close the sidebar.

```javascript
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About Us' },
    { path: '/services', name: 'Services' },
    { path: '/gallery', name: 'Gallery' },
    { path: '/projects', name: 'Projects' },
    { path: '/events', name: 'Events' },
    { path: '/blogs', name: 'Blogs' },
    { path: '/contact', name: 'Contact Us' },
]

const Nav = ({ containerStyles, linkStyles, underlineStyles, onLinkClick }) => {
    const path = usePathname();
    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => (
                <Link
                    href={link.path}
                    key={index}
                    className={`uppercase ${linkStyles}`}
                    onClick={onLinkClick}  // Close sidebar when any link is clicked
                >
                    {link.path === path && (
                        <motion.span
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            transition={{ type: 'tween' }}
                            layoutId='underline'
                            className={`${underlineStyles}`} 
                        />
                    )}
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}

export default Nav;
```

### Explanation of changes:
1. **`isOpen` state**: This state keeps track of whether the sidebar is open or closed. When the pathname changes, the `useEffect` hook automatically closes the sidebar by setting `isOpen` to `false`.
2. **`onLinkClick` function**: This is a function passed from the `Mobilenavigation` component to the `Nav` component. It is triggered when a link is clicked and will close the sidebar.
3. **`open` and `onOpenChange`**: The `Sheet` component now uses the `open` prop and the `onOpenChange` callback to control whether the sidebar is open or closed.

### Summary:
- The sidebar will now automatically close when navigating to a new path because of the `useEffect` hook listening for changes in `path`.
- Additionally, when a user clicks a link, the sidebar will close as well by calling `onLinkClick`.

Let me know if you need further clarification or adjustments!
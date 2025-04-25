import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-xl md:text-2xl font-nunito font-bold bg-gradient-to-r from-pastel-purple to-pastel-blue bg-clip-text text-transparent">
          Academic Resources
        </h1>
      </Link>

      <div className="hidden md:flex rounded-full bg-muted px-3 py-2 w-80 items-center">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <input 
          type="search" 
          placeholder="Search resources..." 
          className="bg-transparent border-none focus:outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">AO</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end" forceMount>
            <div className="space-y-1">
              <p className="text-sm font-medium">Academic User</p>
              <p className="text-xs text-muted-foreground">user@academic.edu</p>
            </div>
            <div className="mt-5 space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;

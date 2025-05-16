import React, { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pipelineStages } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from 'react-responsive';

interface NavbarProps {
  toggleSidebar?: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-white shadow-sm px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Logo (only visible when search is closed on mobile) */}
        {(!isMobile || !isSearchOpen) && (
          <div className="font-bold text-lg text-teal flex items-center">
            <span className="hidden md:inline">SalesPipe</span>
          </div>
        )}
      </div>
      
      {/* Search bar - expands on mobile when active */}
      <div className={`transition-all duration-300 ${
        isSearchOpen && isMobile ? 'flex-1' : 'w-full max-w-md'
      }`}>
        {isSearchOpen || !isMobile ? (
          <div className="relative">
            <Input
              type="search"
              placeholder="Search contacts, deals, notes..."
              className="w-full pl-10 pr-4 py-2 focus-visible:ring-skyblue"
              autoFocus={isSearchOpen}
              onBlur={() => isMobile && setIsSearchOpen(false)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {isMobile && isSearchOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
          </Button>
        )}
      </div>
      
      {/* Filter pills - hide on mobile or when search is active */}
      {(!isMobile && !isSearchOpen) && (
        <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
          {pipelineStages.slice(0, 5).map((stage) => (
            <Button key={stage.key} variant="outline" size="sm" className="whitespace-nowrap">
              {stage.label}
            </Button>
          ))}
        </div>
      )}
      
      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Search button for mobile */}
        {isMobile && !isSearchOpen && (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center bg-skyblue text-[10px]">3</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 border-b">
              <h4 className="font-medium">Notifications</h4>
            </div>
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 border-b hover:bg-muted/50">
                  <div className="font-medium">New lead added</div>
                  <p className="text-sm text-muted-foreground">Sarah Miller from Wayne Enterprises</p>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
              ))}
            </div>
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full text-skyblue">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
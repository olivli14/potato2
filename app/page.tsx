"use client"

import { PotatoCard } from '@/components/potato-card';
import NavigationHeader from '@/components/nav-bar';

export default function Home() {
  
  return (
    <div>
      <div>
        <NavigationHeader/>
        <div>
          <PotatoCard />
        </div>
      </div>
    </div>
  );
}
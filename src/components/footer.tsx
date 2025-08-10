"use client";

import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <Container className="mx-auto px-6 py-12 flex flex-wrap gap-10">
        <div>
          <h3 className="mb-6 text-lg font-semibold text-primary">Support</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Cancellation Options
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Safety Information
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold text-primary">Community</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary transition">
                Airbnb.org
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Diversity & Belonging
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold text-primary">Hosting</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary transition">
                Host your home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Host an Experience
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Responsible hosting
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold text-primary">About</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="#" className="hover:text-primary transition">
                Newsroom
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition">
                Privacy & Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t mt-6 py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Airbnb Clone. All rights reserved.
      </div>
    </footer>
  );
}

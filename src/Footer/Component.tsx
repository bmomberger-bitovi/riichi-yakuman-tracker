import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />

          <div>
            <p>
              Information from
              {" "}
              <Link href="https://en.wikipedia.org/wiki/Japanese_mahjong_yaku">https://en.wikipedia.org/wiki/Japanese_mahjong_yaku</Link>
            </p>
            <p>
              Licensed
              {" "}
              <Link href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_4.0_International_License">CC-BY-SA 4.0</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

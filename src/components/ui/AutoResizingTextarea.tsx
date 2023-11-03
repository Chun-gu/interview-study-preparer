'use client'

import { forwardRef, useLayoutEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import type { Writable } from '@/types'
import type { ComponentPropsWithoutRef } from 'react'

const AutoResizingTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<'textarea'>
>(({ className, ...props }, forwardedRef) => {
  const innerRef = useRef<HTMLTextAreaElement>(null)

  function resizeTextarea() {
    if (!innerRef.current) return

    innerRef.current.style.height = 'auto'

    const scrollHeight = innerRef.current.scrollHeight
    const { borderTopWidth, borderBottomWidth } = window.getComputedStyle(
      innerRef.current,
    )
    const borderWidth =
      parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)

    innerRef.current.style.height = `${scrollHeight + borderWidth}px`
  }

  function composeRef(el: HTMLTextAreaElement) {
    if (innerRef.current) return

    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef) forwardedRef.current = el
    ;(innerRef as Writable<typeof innerRef>).current = el
  }

  function onChange() {
    resizeTextarea()
  }

  useLayoutEffect(() => {
    resizeTextarea()
  })

  return (
    <textarea
      ref={composeRef}
      rows={1}
      onChange={onChange}
      className={cn('resize-none', className)}
      {...props}
    />
  )
})

AutoResizingTextarea.displayName = 'AutoResizingTextarea'
export default AutoResizingTextarea


export function PointerHighlightDemo() {
  return (
    <div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
      There has to be some
      <PointerHighlight
        rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
        pointerClassName="text-yellow-500"
      >
        <span className="relative z-10">background to animate too</span>
      </PointerHighlight>
    </div>
  );
}

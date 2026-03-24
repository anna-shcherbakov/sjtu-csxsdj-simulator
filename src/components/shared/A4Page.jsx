const PAGE_WIDTH = 794
const PAGE_HEIGHT = 1123

function A4Page({
  children,
  className = '',
  contentClassName = '',
  padded = true,
  zoom,
}) {
  const scale = zoom / 100
  const pageClassName = ['a4-page', className].filter(Boolean).join(' ')
  const contentClasses = [
    'a4-page__content',
    padded ? 'a4-page__content--padded' : '',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className="a4-page-shell"
      style={{
        height: `${PAGE_HEIGHT * scale}px`,
        width: `${PAGE_WIDTH * scale}px`,
      }}
    >
      <div
        className={pageClassName}
        style={{
          height: `${PAGE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${PAGE_WIDTH}px`,
        }}
      >
        <div className={contentClasses}>{children}</div>
      </div>
    </div>
  )
}

export default A4Page

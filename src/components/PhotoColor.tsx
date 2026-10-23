import './PhotoColor.css';

/** Small display-only tonal adjustments. Original photographs and geometry stay intact. */
export default function PhotoColor() {
  return (
    <svg class="photo-color-definitions" width="0" height="0" aria-hidden="true">
      <defs>
        <filter id="chs-photo-neutral" color-interpolation-filters="sRGB">
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 .133 .26 .383 .505 .626 .747 .866 .985" />
            <feFuncG type="table" tableValues="0 .133 .26 .383 .505 .626 .747 .866 .985" />
            <feFuncB type="table" tableValues="0 .133 .26 .383 .505 .626 .747 .866 .985" />
          </feComponentTransfer>
          <feColorMatrix type="saturate" values=".99" />
        </filter>
        <filter id="chs-photo-indoor" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".997 0 0 0 0  0 .994 0 0 0  0 0 1.009 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 .13 .258 .382 .503 .623 .744 .866 .985" />
            <feFuncG type="table" tableValues="0 .13 .258 .382 .503 .623 .744 .866 .985" />
            <feFuncB type="table" tableValues="0 .13 .258 .382 .503 .623 .744 .866 .985" />
          </feComponentTransfer>
        </filter>
        <filter id="chs-photo-worlds" color-interpolation-filters="sRGB">
          <feComponentTransfer>
            <feFuncR type="table" tableValues=".004 .17 .29 .40 .51 .61 .71 .80 .885 .98" />
            <feFuncG type="table" tableValues=".004 .19 .32 .43 .54 .64 .735 .82 .90 .98" />
            <feFuncB type="table" tableValues=".004 .18 .30 .41 .52 .62 .72 .81 .89 .98" />
          </feComponentTransfer>
          <feColorMatrix type="saturate" values=".96" />
        </filter>
      </defs>
    </svg>
  );
}

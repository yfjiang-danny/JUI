import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";


export interface SpriteIconProps {
  id: string;
}

const SpriteIcon = forwardRef(
  (
    { id, ...restProps }: SpriteIconProps & SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
  ) => {
    return (
      <svg width={"1em"} height={"1em"} {...restProps} ref={ref}>
        <use xlinkHref={`#${id}`} />
      </svg>
    );
  }
);

export default SpriteIcon;

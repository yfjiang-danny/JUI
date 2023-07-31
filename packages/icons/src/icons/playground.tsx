import kebabCase from "kebab-case";
import { ComponentType, SVGProps, useMemo } from "react";
import * as colorfulIcons from "./dist/colorful";
import * as normalIcons from "./dist/normal";
import classes from "./playground.module.css";
import "./sprite/loader";
import SpriteIcon from "./sprite/sprite-icon";

export default function Playground() {
  const normalKeys = useMemo(() => {
    try {
      return Object.keys(normalIcons);
    } catch (error) {
      return undefined;
    }
  }, []);

  const colorfulKeys = useMemo(() => {
    try {
      return Object.keys(colorfulIcons);
    } catch (error) {
      return undefined;
    }
  }, []);

  const spriteNormalIcons = useMemo(() => {
    try {
      return normalKeys?.map((k) => {
        return (
          <div id={k} key={k} className={classes["item"]}>
            <SpriteIcon id={kebabCase(k.substring(3)).substring(1)} />
            <p>{k}</p>
          </div>
        );
      });
    } catch (error) {
      return undefined;
    }
  }, [normalKeys]);

  const spriteColorfulIcons = useMemo(() => {
    try {
      return colorfulKeys?.map((k) => {
        return (
          <div id={k} key={k} className={classes["item"]}>
            <SpriteIcon id={kebabCase(k.substring(3)).substring(1)} />
            <p>{k}</p>
          </div>
        );
      });
    } catch (error) {
      return undefined;
    }
  }, [colorfulKeys]);

  const svgrNormalIcons = useMemo(() => {
    try {
      return normalKeys?.map((k) => {
        const Icon = (normalIcons as any)[k] as ComponentType<
          SVGProps<SVGSVGElement>
        >;
        return (
          <div id={k} key={k} className={classes["item"]}>
            <Icon />
            <p>{k}</p>
          </div>
        );
      });
    } catch (error) {
      return undefined;
    }
  }, [normalKeys]);

  const svgrColorfulIcons = useMemo(() => {
    try {
      return colorfulKeys?.map((k) => {
        const Icon = (colorfulIcons as any)[k] as ComponentType<
          SVGProps<SVGSVGElement>
        >;
        return (
          <div id={k} key={k} className={classes["item"]}>
            <Icon />
            <p>{k}</p>
          </div>
        );
      });
    } catch (error) {
      return undefined;
    }
  }, [colorfulKeys]);

  return (
    <div className={classes.session}>
      <div className={classes.title}>Sprite Impl.</div>
      <div className={classes.session}>
        <div className={classes.title}>Normal.</div>
        <div className={classes["block"]}>{spriteNormalIcons}</div>
        <div className={classes.title}>Colorful.</div>
        <div className={classes["block"]}>{spriteColorfulIcons}</div>
      </div>
      <div>
        <div className={classes.title}>SVGR Impl.</div>
        <div className={classes.session}>
          <div className={classes.title}>Normal.</div>
          <div className={classes["block"]}>{svgrNormalIcons}</div>
          <div className={classes.title}>Colorful.</div>
          <div className={classes["block"]}>{svgrColorfulIcons}</div>
        </div>
      </div>
      <p style={{ color: "#999" }}>
        [图标名]-[状态?]-[形状?]-[描线?]-[方向?]@[1,2,3]x,带?号为可选
      </p>
    </div>
  );
}

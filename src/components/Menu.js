// @flow
import React, { Component, type ElementRef, type Node } from 'react';

import { className, getMenuPlacement } from '../utils';
import { Div } from '../primitives';
import { borderRadius, colors, spacing } from '../theme';
import type { InnerRef, MenuPlacement, PropsWithStyles } from '../types';

// ==============================
// Menu
// ==============================

type MenuProps = PropsWithStyles & {
  children: Node,
  menuPlacement: MenuPlacement,
  menuShouldFlip: boolean,
  innerProps: Object,
};
type MenuState = { placement: MenuPlacement };

const placementToCSSProp = { bottom: 'top', top: 'bottom' };
export const menuCSS = ({ placement }: MenuState) => ({
  backgroundColor: colors.neutral0,
  boxShadow: `0 0 0 1px ${colors.neutral10a}, 0 4px 11px ${colors.neutral10a}`,
  borderRadius: borderRadius,
  marginBottom: spacing.menuGutter,
  marginTop: spacing.menuGutter,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
  [placementToCSSProp[placement]]: '100%',
});

export class Menu extends Component<MenuProps, MenuState> {
  state = { placement: this.props.menuPlacement };
  getPlacement = (ref: ElementRef<*>) => {
    if (!ref) return;

    const placement = getMenuPlacement(ref);

    if (!placement) return;

    this.setState({ placement });
  };
  render() {
    const { children, getStyles, menuShouldFlip, innerProps } = this.props;
    const innerRef = menuShouldFlip ? this.getPlacement : null;

    return (
      <Div
        className={className('menu')}
        css={getStyles('menu', { ...this.props, ...this.state })}
        innerRef={innerRef}
        {...innerProps}
      >
        {children}
      </Div>
    );
  }
}

export default Menu;

// ==============================
// Menu List
// ==============================

type MenuListState = {
  isMulti: boolean,
  maxHeight: number,
};

type MenuListProps = {
  children: Node,
  innerProps: {
    'aria-multiselectable': boolean,
    id: string,
    innerRef: InnerRef,
    role: 'listbox',
  },
};
type Props = PropsWithStyles & MenuListProps & MenuListState;
export const menuListCSS = ({ maxHeight }: MenuListState) => ({
  maxHeight,
  overflowY: 'auto',
  paddingBottom: spacing.baseUnit,
  paddingTop: spacing.baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
  WebkitOverflowScrolling: 'touch',
});
export const MenuList = (props: Props) => {
  const { children, getStyles, isMulti, innerProps } = props;
  return (
    <Div
      className={className('menu-list', { isMulti })}
      css={getStyles('menuList', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};

// ==============================
// Menu Notices
// ==============================

const noticeCSS = () => ({
  color: colors.neutral40,
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  textAlign: 'center',
});
export const noOptionsMessageCSS = noticeCSS;
export const loadingMessageCSS = noticeCSS;

type NoticeProps = PropsWithStyles & {
  children: Node,
  innerProps: { [string]: any },
};

export const NoOptionsMessage = (props: NoticeProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--no-options'])}
      css={getStyles('noOptionsMessage', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};
NoOptionsMessage.defaultProps = {
  children: 'No options',
};

export const LoadingMessage = (props: NoticeProps) => {
  const { children, getStyles, innerProps } = props;
  return (
    <Div
      className={className(['menu-notice', 'menu-notice--loading'])}
      css={getStyles('loadingMessage', props)}
      {...innerProps}
    >
      {children}
    </Div>
  );
};
LoadingMessage.defaultProps = {
  children: 'Loading...',
};

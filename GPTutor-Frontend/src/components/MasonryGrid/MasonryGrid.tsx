/* eslint-disable */

import * as React from "react";
import { PureComponent, ReactNode } from "react";

import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Masonry,
  Positioner,
} from "react-virtualized";

import {
  createCellPositioner,
  MasonryCellProps,
} from "react-virtualized/dist/es/Masonry";
import { Size } from "react-virtualized/dist/es/AutoSizer";

const offset = 12;
interface IProps<Item> {
  defaultHeight: number;
  defaultWidth: number;
  list: Item[];
  height: number;
  columnWidth: number;
  cellRender: (
    item: Item,
    columnWidth: number,
    style?: React.CSSProperties
  ) => React.ReactNode;
}

interface IState {
  columnWidth: number;
  height: number;
  gutterSize: number;
  overscanByPixels: number;
}

export default class MasonryGrid<Item> extends PureComponent<
  IProps<Item>,
  IState
> {
  private columnCount = 0;
  private cache: CellMeasurerCache;
  private width: number = 0;
  private height: number = 0;
  private cellPositioner: Positioner = null!;
  private masonry: Masonry = null!;

  constructor(props: IProps<Item>) {
    const { defaultWidth, defaultHeight, height, columnWidth, list } = props;

    super(props);

    this.cache = new CellMeasurerCache({
      defaultHeight,
      defaultWidth,
      fixedWidth: true,
    });

    this.state = {
      columnWidth,
      height,
      gutterSize: 10,
      overscanByPixels: 0,
    };
  }

  render() {
    const { height } = this.props;

    return this.renderAutoSizer(height);
  }

  calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;

    if (this.props.list.length < 3) {
      return this.props.list.length;
    }

    this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
  };

  cellRenderer = ({ index, key, parent, style }: MasonryCellProps) => {
    const { list } = this.props;
    const { columnWidth } = this.state;
    const { cellRender } = this.props;

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        {cellRender(list[index % list.length], columnWidth, style)}
      </CellMeasurer>
    );
  };

  initCellPositioner = () => {
    if (!this.cellPositioner) {
      const { columnWidth, gutterSize } = this.state;

      this.cellPositioner = createCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  };

  onResize = ({ width }: Size) => {
    this.width = width;

    this.calculateColumnCount();
    this.resetCellPositioner();
    this.masonry.recomputeCellPositions();
  };

  renderAutoSizer = (height: number) => {
    this.height = height;

    const { overscanByPixels } = this.state;

    return (
      // @ts-ignore
      <AutoSizer
        disableHeight
        height={height}
        onResize={this.onResize}
        overscanByPixels={overscanByPixels}
      >
        {this.renderMasonry}
      </AutoSizer>
    );
  };

  renderMasonry = ({ width }: Size): ReactNode => {
    this.width = width - offset;

    this.calculateColumnCount();
    this.initCellPositioner();

    const { height, overscanByPixels } = this.state;

    const length = this.props.list.length;

    return (
      <Masonry
        autoHeight={false}
        cellCount={length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={this.setMasonryRef}
        width={this.width}
      />
    );
  };

  resetCellPositioner = () => {
    const { columnWidth, gutterSize } = this.state;

    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  };

  setMasonryRef = (ref: Masonry) => {
    this.masonry = ref;
  };
}

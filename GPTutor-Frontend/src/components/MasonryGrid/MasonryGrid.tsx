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
  width: number;
  columnWidth: number;
  cellRender: (
    item: Item,
    columnWidth: number,
    style?: React.CSSProperties
  ) => React.ReactNode;
}

interface IState {
  columnWidth: number;
  gutterSize: number;
  overscanByPixels: number;
}

export default class MasonryGrid<Item> extends PureComponent<
  IProps<Item>,
  IState
> {
  private columnCount = 0;
  private cache: CellMeasurerCache;
  private cellPositioner: Positioner = null!;

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
      gutterSize: 10,
      overscanByPixels: 0,
    };
  }

  render() {
    return this.renderAutoSizer();
  }

  calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;

    if (this.props.list.length < 3) {
      this.columnCount = this.props.list.length;
      return;
    }

    if (this.props.width === 0) {
      this.columnCount = 3;
      return;
    }

    this.columnCount = Math.floor(
      this.props.width / (columnWidth + gutterSize)
    );
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

  renderAutoSizer = () => {
    const { height, width } = this.props;

    return this.renderMasonry({ height, width });
  };

  renderMasonry = ({ width, height }: Size): ReactNode => {
    this.calculateColumnCount();
    console.log(this.columnCount, "this.columnCount");

    this.initCellPositioner();

    const { overscanByPixels } = this.state;

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
        width={width}
      />
    );
  };
}

import React from "react";

import styles from "./index.less";

interface InfinitelListProps {
    dataSource: any[];
    screenHeight: number;
}

interface InfinitelListState {
    listHeight: number;
    itemSize: number;
    startOffset: number;
    visibleData: any[];
}

class InfinitelList extends React.Component<InfinitelListProps, InfinitelListState> {
    constructor(props: InfinitelListProps) {
        super(props);
        this.state = {
            listHeight: 0, // 列表总高度
            itemSize: 50, // 每项固定高度
            startOffset: 0, // 偏移量
            visibleData: [], // 列表显示数据,
        };
        this.onScroll = this.onScroll.bind(this);
    }

    public componentDidMount() {
        this.load(0);
    }

    public load = (scrollTop: number) => {
        const { dataSource, screenHeight } = this.props;
        const { itemSize } = this.state;
        // 列表总高度
        const listHeight = dataSource.length * itemSize;
        // 可显示的列表项数
        const visibleCount = Math.ceil(screenHeight / itemSize);
        // 数据的起始索引
        const start = Math.floor(scrollTop / itemSize);
        // 数据结束索引
        const end = start + visibleCount;
        // 列表显示数据
        const visibleData = dataSource.slice(start, end);
        // 当前偏移量
        const startOffset = scrollTop - (scrollTop % itemSize);
        this.setState({
            listHeight,
            visibleData,
            startOffset,
        });
    }

    public onScroll = (e: any) => {
        this.load(e.target.scrollTop);
    }

    public render() {
        const { visibleData, listHeight, itemSize, startOffset } = this.state;

        return (
            <div
                className={styles["infinite-list-container"]}
                onScroll={this.onScroll}
            >
                <div
                    className={styles["infinite-list-phantom"]}
                    style={{ height: `${listHeight}px` }}
                />
                <div
                    className={styles["infinite-list"]}
                    style={{ transform: `translate3d(0, ${startOffset}px, 0)` }}
                >
                    {
                        visibleData.map((item) => (
                            <div
                                className={styles["infinite-list-item"]}
                                style={{ height: `${itemSize}px` }}
                                key={item.id}
                            >
                                {item.value}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default InfinitelList;

import React, { useState } from 'react';
import { Space,Table } from 'antd';
import './HoaDon.scss';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import axios from "axios";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tabs } from 'antd';
const DraggableTabNode = ({ className, ...props }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props['data-node-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleX: 1,
            },
        ),
        transition,
        cursor: 'cursor',
    };
    return React.cloneElement(props.children, {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
    });
};

const columns = [
    {
        title: 'STT',
        dataIndex: 'name',
       
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'Action',
        key: 'action',
        sorter: true,
        render: () => (
            <Space size="middle">
                <a>Delete</a>
    
            </Space>
        ),
    },
];
const data = [];
for (let i = 1; i <= 7; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: Number(`${i}2`),
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
}

const defaultTitle = () => 'Here is title';
const defaultFooter = () => '';

const HoaDon = () => {
    const [bordered] = useState(false);
    const [loading] = useState(false);
    const [size] = useState('large');
    const [expandable] = useState(undefined);
    const [showTitle] = useState(false);
    const [showHeader] = useState(true);
    const [showFooter] = useState(true);
    const [rowSelection] = useState({});
    const [hasData] = useState(true);
    const [tableLayout] = useState();
    const [top] = useState('none');
    const [bottom] = useState('bottomCenter');
    const [ellipsis] = useState(false);
    const [yScroll] = useState(false);
    const [xScroll] = useState(false);
   
    // load hoa don 
    const loadHoaDon = async()=>{
        const refult = await axios.get("")
    }

    const scroll = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll) {
        scroll.x = 140;
    }
    const tableColumns = columns.map((item) => ({
        ...item,
        ellipsis,
    }));
    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
        bordered,
        loading,
        size,
        expandable,
        title: showTitle ? defaultTitle : undefined,
        showHeader,
        footer: showFooter ? defaultFooter : undefined,
        rowSelection,
        tableLayout,
    };
    const [items, setItems] = useState([
        {
            key: '1',
            label: 'Tất cả',
            children: 

                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],

                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}
                    headerBg='#fafafa'
                    className='mt-3'
                    
                />
          ,
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children:

                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],

                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}

                    className='mt-3'
                />
            ,
        },
        {
            key: '3',
            label: 'Xác nhận',
            children:

                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],

                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}

                    className='mt-3'
                />
            ,
        },
        {
            key: '4',
            label: 'Chờ vận chuyển',
            children:

                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],

                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}

                    className='mt-3'
                />
            ,
        },
        {
            key: '5',
            label: 'Thanh toán',
            children:

                <Table
                    {...tableProps}
                    pagination={{
                        position: [top, bottom],

                    }}
                    columns={tableColumns}
                    dataSource={hasData ? data : []}

                    className='mt-3'
                />
            ,
        },
        {
            key: '6',
            label: 'Hủy',
            children: <p>heheh</p>
            ,
        },
    ]);
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setItems((prev) => {
                const activeIndex = prev.findIndex((i) => i.key === active.id);
                const overIndex = prev.findIndex((i) => i.key === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };
    return (
        <div>
            <div class="container-fluid">
                <h4 className='text-center pt-1' >Danh sách hóa đơn</h4>

                <div className='container-fluid mt-4'>
                    <div>
                        <Tabs
                            items={items}
                            renderTabBar={(tabBarProps, DefaultTabBar) => (
                                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                                    <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                                        <DefaultTabBar {...tabBarProps}>
                                            {(node) => (
                                                <DraggableTabNode {...node.props} key={node.key}>
                                                    {node}
                                                </DraggableTabNode>
                                            )}
                                        </DefaultTabBar>
                                    </SortableContext>
                                </DndContext>
                            )}
                        />
                    </div>
                </div>
            </div>

           
        </div>
    )



}

export default HoaDon;
import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZSHColumns {

    static getColumns(onBomClick, onInventoryClick){
        return [{
            title: 'Line',
            width: 80,
            dataIndex: 'ITEMNO',
            key: 'ITEMNO',
            fixed: 'left'
        },
        {
            title: 'Product',
            dataIndex: 'MATERIAL',
            key: 'MATERIAL',
            color: 'green',

        },
        {
            title: 'Color',
            dataIndex: 'COLOR',
            key: 'COLOR'
        },
        {
            title: 'Quantity',
            dataIndex: 'QUANTITY',
            key: 'QUANTITY'
        },
        {
            title: 'Width',
            dataIndex: 'WIDTH',
            key: 'WIDTH'
        },
        {
            title: 'Length',
            dataIndex: 'LENGTH',
            key: 'LENGTH'
        },
        {
            title: 'Plant',
            dataIndex: 'PLANT',
            key: 'PLANT'
        },
        {
            title: 'Frame',
            dataIndex: 'FRAME',
            key: 'FRAME'
        },
        {
            title: 'Arch',
            dataIndex: 'ARCH',
            key: 'ARCH'
        },
        {
            title: 'Louer Size',
            dataIndex: 'LOUVER_SIZE',
            key: 'LOUVER_SIZE'
        },
        {
            title: 'Hinges',
            dataIndex: 'HINGES',
            key: 'HINGES'
        },
        {
            title: 'Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH'
        },
        {
            title: 'Pre Drill Code',
            dataIndex: 'PRE_MAGNET_DRILL',
            key: 'PRE_MAGNET_DRILL'
        },
        {
            title: 'Clear View Option',
            dataIndex: 'CLEAR_VIEW',
            key: 'CLEAR_VIEW'
        },
        {
            title: 'Square Feet',
            dataIndex: 'PRICE_VINYL',
            key: 'PRICE_VINYL'
        },
        {
            title: 'Best Discount',
            dataIndex: 'BESTDISCOUNT',
            key: 'BESTDISCOUNT',
            render: (record) => {
                return (

                    <Button
                        onClick={() => {
                            let aData = [];
                            aData = record;
                            aData.map((item) => {
                                let currentValue = item.COND_VAL + "%";
                                item.VALUE = currentValue;
                                return item;

                            });
                            ModalInfo.show('Best Discount', aData, "l");
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'ITEMPRICE',
            key: 'ITEMPRICE'
        },
            {
                title: 'Surcharges',
                dataIndex: 'EX_SURCHRG',
                key: 'EX_SURCHRG',
                render: (record) => {
                    return (


                        <Button
                            onClick={() => {
                                const columns = [
                                    {
                                        title: 'Selected',
                                        dataIndex: 'MARK',
                                        key: 'MARK',

                                    },
                                    {
                                        title: 'Surcharge Type',
                                        dataIndex: 'COND_TYP',
                                        key: 'COND_TYP',

                                    },
                                    {
                                        title: 'Description',
                                        dataIndex: 'VTEXT',
                                        key: 'VTEXT'
                                    },
                                    {
                                        title: 'Value',
                                        dataIndex: 'COND_VAL',
                                        key: 'COND_VAL'
                                    }
                                ];

                                ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE");
                            }}
                            type="default" icon="eye-o">View</Button>
                    )
                }
            },
            {
                title: 'BOM',
                dataIndex: 'BOM',
                key: 'BOM',
                render: (record) => {
                    return (


                        <Button
                            onClick={() => {
                                console.log(record);
                                onBomClick(record.orderId, record.lineItemNumber);
                            }}
                            type="default" icon="eye-o">View</Button>
                    )
                }
            },
            {
                title: 'Inventory',
                dataIndex: 'INVENTORY',
                key: 'INVENTORY',
                render: (record) => {
                    return (


                        <Button
                            onClick={() => {

                                onInventoryClick(record.orderId)
                            }}
                            type="default" icon="eye-o">View</Button>
                    )
                }
            }]
        
    }
}

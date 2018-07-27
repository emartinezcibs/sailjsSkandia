import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZVTColumns {

    static getColumns(onSurchargesClick, onBestDiscountClick,onBomClick, onInventoryClick) {
        var aColumns = [{
            title: 'Line',
            width: 80,
            dataIndex: 'ITEMNO',
            key: 'ITEMNO',
            fixed: 'left',
            render: (text, record) => {
                    
                let value = text.replace(/^0+/, '');
                return (
                    <span>{value}</span> 
                )
            } 
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
            title: 'Bracket Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH'
        },
        {
            title: 'Stack',
            dataIndex: 'STACK',
            key: 'STACK'
        },
        {
            title: 'Controls',
            dataIndex: 'CONTROLS',
            key: 'CONTROLS'
        },
        {
            title: 'Free Hang',
            dataIndex: 'FREEHANG',
            key: 'FREEHANG'
        },
        {
            title: 'Extension Brackets',
            dataIndex: 'EXTB',
            key: 'EXTB'
        },
        {
            title: 'Bottom Chains',
            dataIndex: 'TWOONONE',
            key: 'TWOONONE'
        },
        {
            title: 'Gross price',
            dataIndex: 'GROSSPRICE',
            key: 'GROSSPRICE'
        },
        {
            title: 'Discount',
            dataIndex: 'BESTDISCOUNT',
            width: 160,
            key: 'BESTDISCOUNT',
            render: (record) => {
                console.log(record);
                let currentDiscount="";

                record.map((item) => {
                    let currentNumber= parseFloat(Math.round(item.COND_VAL * 100)/ 100).toFixed(2)
                    let currentValue = currentNumber + "%";
                    currentDiscount= currentDiscount+currentValue+" / ";
                    item.VALUE = currentValue;
                    return item;

                });
                return (
                    
                    

                    <span>{ currentDiscount.substring(0, currentDiscount.length - 3)}</span>
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
                            /* const columns = [
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

                            ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE"); */

                            onSurchargesClick(record);
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        }];



        if ( localStorage.getItem('userType') != "D"){
        aColumns.push({
            title: 'BOM',
            dataIndex: 'BOM',
            key: 'BOM',
            render: (record) => {
                return (


                    <Button
                        onClick={() => {
                            console.log(record);
                            onBomClick(record.orderId, record.lineItemNumber);
                           {}
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        }); 
        aColumns.push({
            title: 'Inventory',
            dataIndex: 'INVENTORY',
            key: 'INVENTORY',
            render: (record) => {
                return (


                    <Button
                        onClick={() => {

                            onInventoryClick(record.orderId)
                            {}
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        });


    }

    return aColumns;
        
        
    }
}

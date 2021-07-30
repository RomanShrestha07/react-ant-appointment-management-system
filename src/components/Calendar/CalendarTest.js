// import {useState} from 'react';
// import {Alert, Badge, Calendar, Card, Popover} from "antd";
//
// const CalendarTest = () => {
//     const [date, setDate] = useState('')
//
//     const onSelect = (value) => {
//         console.log(value.format('YYYY-MM-DD'));
//     };
//
//     const onPanelChange = (value) => {
//         console.log(value.format('YYYY-MM-DD'));
//         setDate(value.format('YYYY-MM-DD'));
//     };
//
//     function getListData(value) {
//         let listData;
//         switch (value.date()) {
//             case 7:
//                 listData = [
//                     {type: 'warning', content: 'This is warning event.'},
//                     {type: 'success', content: 'This is usual event.'},
//                 ];
//                 break;
//             case 10:
//                 listData = [
//                     {type: 'warning', content: 'This is warning event.'},
//                     {type: 'success', content: 'This is usual event.'},
//                     {type: 'error', content: 'This is error event.'},
//                 ];
//                 break;
//             case 15:
//                 listData = [
//                     {type: 'warning', content: 'This is warning event'},
//                     {type: 'success', content: 'This is very long usual event。。....'},
//                     {type: 'error', content: 'This is error event 1.'},
//                     {type: 'error', content: 'This is error event 2.'},
//                     {type: 'error', content: 'This is error event 3.'},
//                     {type: 'error', content: 'This is error event 4.'},
//                 ];
//                 break;
//             default:
//         }
//         return listData || [];
//     }
//
//     function dateCellRender(value) {
//         const listData = getListData(value);
//
//         const popContent = (item) => {
//             return (
//                 <div>
//                     <p>{item.content}</p>
//                 </div>
//             )
//         }
//
//         return (
//             <ul style={events}>
//                 {listData.map(item => (
//                     <li key={item.content}>
//                         <Popover content={popContent(item)} title={item.type}>
//                             <Badge status={item.type} style={events_ant_badge} text={item.content}
//                                    onClick={() => handleClick(item)}/>
//                         </Popover>
//                     </li>
//                 ))}
//             </ul>
//         );
//     }
//
//     function getMonthData(value) {
//         if (value.month() === 8) {
//             return 1394;
//         }
//     }
//
//     function monthCellRender(value) {
//         const num = getMonthData(value);
//         return num ? (
//             <div style={notes_month}>
//                 <section style={notes_month_section}>{num}</section>
//                 <span>Backlog Number</span>
//             </div>
//         ) : null;
//     }
//
//     return (
//         <div>
//             <Card title='Calendar'>
//                 <Alert style={{marginBottom: 24}} message={`You selected date: ${date}`}/>
//
//                 <Card>
//                     <Calendar onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender}
//                               monthCellRender={monthCellRender}
//                     />
//                 </Card>
//             </Card>
//         </div>
//     );
// };
//
// export default CalendarTest;
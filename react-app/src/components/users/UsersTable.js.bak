import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import tableIcons from '../templates/TableIcons';
import getColumns from './UsersColumns';
import Edit from "@material-ui/icons/Edit";
import { withRouter } from "react-router";
import { AddBox } from "@material-ui/icons";
import { deleteUsers, getUsers } from "../../repo/usersRepo";
/*
Documentation on developing the Material-Table can be found at https://material-table.com/
You can use the async function passed to MaterialTable data prop to implement filters and sorting on server-side
Filters and sorting can't be implemented on client side due to server-side pagination.
*/

const UsersTable = (props) => {
    const history = props.history;
    const [columns, setColumns] = useState(getColumns({}));

    //Here we call delete
    const handleRowDelete = (oldData, resolve) => {
        deleteUsers(oldData.user_id)
            .then(res => {
                resolve()
            })
            .catch(error => {
                resolve()
            })
    }

    return (
        <div>
            <MaterialTable
                minRows={20}
                title="Users Data"
                columns={columns}
                data={async (query) => {
                    const res = await getUsers(query.page, query.pageSize, query.search);
                    return ({
                        data: res.records,
                        page: query.page,
                        totalCount: parseInt(res.total_count)
                    })
                }
                }
                options={{
                    sorting: true,
                    actionsColumnIndex: -1,
                    pageSize: 20,
                    toolbar: true,
                    paging: true
                }}

                actions={[
                    {
                        icon: () => <Edit />,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                            history.push({
                                pathname: `/users/update/${rowData.user_id}`,
                                user: rowData
                            })
                        }
                    },
                    {
                        icon: () => <AddBox variant="contained" color="secondary" />,
                        tooltip: 'Add New',
                        // This makes add button to appear in table toolbar instead for each row
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            history.push("/users/add")
                        }
                    }
                ]}

                icons={tableIcons}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}

            />
        </div>);
}
export default withRouter(UsersTable);

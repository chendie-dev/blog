import React from 'react'
import { Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.css'
interface childProps {
    open: boolean,
    onCancel: any
}
const SearchModel: React.FC<childProps> = (props) => {

    return (
        <Modal {...props} footer={[]}>
            <div className="search-wrapper" style={{ borderRadius: "4px" }}>
                {/* <!-- 输入框 --> */}
                <div className="search-input-wrapper">
                    <SearchOutlined style={{fontSize:'20px',color:'#666'}}/>
                    <input v-model="keywords" placeholder="输入文章标题或内容..." />
                </div>
                <div className="search-result-wrapper">
                    <hr className="divider" />
                    <ul>
                        <li className="search-reslut" >
                            {/* <!-- 文章标题 --> */}
                            <a v-html="item.articleTitle" />
                            {/* <!-- 文章内容 --> */}
                            <p
                                className="search-reslut-content text-justify"
                                v-html="item.articleContent"
                            />
                        </li>
                    </ul>
                    {/* <!-- 搜索结果不存在提示 --> */}
                    <div
                        style={{ fontSize: "0.875rem" }}
                    >
                        找不到您查询的内容：??
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default SearchModel

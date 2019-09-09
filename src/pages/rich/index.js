import React from 'react'
import {Card, Button, Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';
export default class RichText extends React.Component{

    state={
        editorState:'',
        showRichText:false
    }

    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState,
        })
    }
    handleClearContent= ()=>{
        this.setState({
            editorState:''
        })
    }

    handleGetText = ()=>{
        this.setState({
            showRichText:true   
        })
    }

    onEditorChange=(contentState)=>{ 
        this.setState({
            contentState,
        })
    }

    render(){
        const {editorState} = this.state;
        return(
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft:10}}>获取HTML文本文件</Button>
                </Card>
                <Card title="副文本编辑器">
                <Editor
                    editorState={editorState}
                    onContentStateChange={this.onEditorChange}
                    onEditorStateChange={this.onEditorStateChange}
                />
                </Card>
                <Modal
                    title="副文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        );
    }
}
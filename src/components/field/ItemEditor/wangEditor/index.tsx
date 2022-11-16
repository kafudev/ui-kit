import React, { useEffect, useRef, useState } from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../../RenderItem';
import { nanoid, ProFieldFCRenderProps } from '@ant-design/pro-utils';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import {
  createEditor,
  createToolbar,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';
import './index.less';

export interface ItemEditorProps extends RenderItemProps {
  modeType?: 'default' | 'simple';
  config?: IEditorConfig; //  编辑器配置
  toolbarConfig?: IToolbarConfig; // 编辑器工具条配置
  zIndex?: number;
  height?: string | number;
  uploadUrl?: string; // 上传链接
  uploadResult?: (res: any) => { url: string; alt?: string; href?: string }; // 请求结果处理
  onChange?: (value: any, content: any, editor: any) => void;
  onBlur?: (value: any, content: any, editor: any) => void;
}
const LogTag = 'ItemEditor';
const ItemEditor = (props: ItemEditorProps) => {
  const [id] = useState<string>(Math.random().toString(6).substr(2, 4));
  const ref = useRef<HTMLDivElement>(null);
  const refTool = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello</p>'); // 编辑器内容

  useEffect(() => {
    // 创建编辑器
    const editor = createEditor({
      selector: `#editor_${id}`,
      config: {
        autoFocus: false,
        ...props?.config,
        ...props?.editorConfig,
        MENU_CONF: {
          ...props?.config?.MENU_CONF,
          ...props?.editorConfig?.MENU_CONF,
          uploadImage: {
            server: props?.uploadUrl || '/admin/sys/common/upload',
            fieldName: props?.uploadName || 'file',
            // 单个文件的最大体积限制
            maxFileSize: 10 * 1024 * 1024, // 10M
            // 自定义增加 http  header
            headers: {
              // Accept: '*/*',
              // 'Content-Type': 'multipart/form-data',
              // Accept: '*/*',
              // 'Content-Type': 'multipart/form-data',
              'X-Access-Token': window.localStorage.getItem('token') || '',
              AUTHORIZATION: window.localStorage.getItem('token') || '',
              ...props?.headers,
            },
            // 自定义插入图片
            customInsert(res: any, insertFn: any) {
              // res 即服务端的返回结果
              let url = '';
              let alt = '';
              let href = '';
              if (props?.uploadResult) {
                res = props?.uploadResult(res);
                // 上传成功
                url = res?.url;
                alt = res?.alt;
                href = res?.href;
              }
              // 从 res 中找到 url alt href ，然后插图图片
              insertFn(url, alt, href);
            },
            ...props?.config?.MENU_CONF?.uploadImage,
            ...props?.editorConfig?.MENU_CONF?.uploadImage,
          },
          // fontFamily: {
          //   fontFamilyList: [
          //     // 元素支持两种形式
          //     //   1. 字符串；
          //     //   2. { name: 'xxx', value: 'xxx' }
          //     '黑体',
          //     '楷体',
          //     { name: '仿宋', value: '仿宋' },
          //     'Arial',
          //     'Tahoma',
          //     'Verdana',
          //   ],
          // },
        },
        placeholder: (props?.placeholder as string) || props?.config?.placeholder || '请输入内容',
        onChange: (editor: IDomEditor) => {
          console.log(LogTag, 'wangEditor onChange: ');
          // 当编辑器选区、内容变化时，即触发
          // console.log('content', editor.children);
          // console.log('html', editor.getHtml());
          props?.onChange?.(editor.getHtml(), editor.children, editor);
        },
        onBlur: (editor: IDomEditor) => {
          // editor blur
          console.log(LogTag, 'wangEditor onBlur: ');
          props?.onBlur?.(editor.getHtml(), editor.children, editor);
        },
      },
      mode: props.modeType || 'default', // 或 'simple'
    });
    // 创建工具栏
    const toolbar = createToolbar({
      editor,
      selector: `#toolbar_${id}`,
      config: {
        insertKeys: {
          index: 9, // 插入的位置，基于当前的 toolbarKeys
          keys: ['through', 'color', 'bgColor', 'clearStyle'],
        },
        excludeKeys: ['code', 'codeBlock', 'uploadVideo', 'group-more-style'],
        ...props?.toolbarConfig,
      },
      mode: props.modeType || 'default', // 或 'simple'
    });
    // console.log(toolbar.getConfig().toolbarKeys, toolbar.getConfig());
    // console.log(editor.getAllMenuKeys(), editor.getConfig().hoverbarKeys);

    setEditor(editor);

    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, []);

  useEffect(() => {
    if (editor) {
      if (props?.mode == 'read') {
        // console.log(LogTag, 'read mode read:', props?.text);
        editor.setHtml(props?.text || '');
        editor.disable();
      }
      if (props?.mode == 'edit') {
        // console.log(LogTag, 'read mode edit:', props?.text);
        editor.setHtml(props?.text || '');
        editor.enable();
      }
    }
  }, [props?.mode, props?.text, editor]);

  useEffect(() => {
    if (editor) {
      if (props?.contentType == 'html') {
        // editor?.readOnly?.toggle(true);
      }
      if (props?.contentType == 'blocks') {
        // editor?.readOnly?.toggle(false);
      }
    }
  }, [props?.contentType]);

  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    // console.log(LogTag, ' renderFormItem', _text, _props);
    return (
      <div
        className="ItemEditorContainer"
        style={{
          zIndex: props?.zIndex || 100,
          border: '1px solid #ccc',
          borderRadius: '2px',
          ...props?.containerStyle,
        }}
      >
        <div
          ref={refTool}
          id={'toolbar_' + id}
          className="ItemEditorTool"
          style={{
            zIndex: props?.zIndex ? props?.zIndex + 1 : 101,
            borderBottom: '1px solid #ccc',
            ...props?.toolbarStyle,
          }}
        />
        <div
          ref={ref}
          id={'editor_' + id}
          className="ItemEditorBox"
          style={{
            zIndex: props?.zIndex || 100,
            height: props?.height || '300px',
            minHeight: '310px',
            ...props?.style,
          }}
        />
      </div>
    );
  };
  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    // console.log(LogTag, ' render', _text, _props);
    return (
      <div
        className="ItemEditorContainer"
        style={{
          zIndex: props?.zIndex || 100,
          border: '0px solid #ccc',
          borderRadius: '2px',
          ...props?.containerStyle,
        }}
      >
        <div
          ref={refTool}
          id={'toolbar_' + id}
          className="ItemEditorTool"
          style={{
            zIndex: props?.zIndex ? props?.zIndex + 1 : 101,
            borderBottom: '1px solid #ccc',
            display: 'none',
            ...props?.toolbarStyle,
          }}
        />
        <div
          ref={ref}
          id={'editor_' + id}
          className="ItemEditorBox"
          style={{
            zIndex: props?.zIndex || 100,
            height: props?.height || 'auto',
            minHeight: '310px',
            ...props?.style,
          }}
        />
      </div>
    );
  };

  return (
    <ProField
      {...props}
      mode={props?.mode}
      renderFormItem={renderFormItem}
      render={render}
      text={props.text}
    />
  );
};
export default ItemEditor;

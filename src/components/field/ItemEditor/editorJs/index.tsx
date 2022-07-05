import React, { useEffect, useState } from 'react';
import ProField, { ProFieldPropsType } from '@ant-design/pro-field/es/index';
import { RenderItemProps } from '../../RenderItem';
import { nanoid, ProFieldFCRenderProps } from '@ant-design/pro-utils';
// https://github.com/codex-team/editor.js
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import './index.less';
// @ts-ignore
// import Embed from '@editorjs/embed';
// import Table from '@editorjs/table';
// import List from '@editorjs/list';
// import Warning from '@editorjs/warning';
// import Code from '@editorjs/code';
// import LinkTool from '@editorjs/link';
// import Image from '@editorjs/image';
// import Raw from '@editorjs/raw';
// import Header from '@editorjs/header';
// import Quote from '@editorjs/quote';
// import Marker from '@editorjs/marker';
// import CheckList from '@editorjs/checklist';
// import Delimiter from '@editorjs/delimiter';
// import InlineCode from '@editorjs/inline-code';
// import SimpleImage from '@editorjs/simple-image';
// import Underline from '@editorjs/underline';

export interface ItemEditorProps extends RenderItemProps {
  contentType?: 'html' | 'blocks';
  config?: EditorConfig;
  onChange?: (value: any, event: any) => void;
}
const LogTag = 'ItemEditor';
const ItemEditor = (props: ItemEditorProps) => {
  const [contentType, setContentType] = useState<'html' | 'blocks'>('blocks');
  const [id] = useState<string>(nanoid());
  const [editor, setEditor] = useState<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: id,
      ...props.config,
      placeholder: (props?.placeholder as string) || props?.config?.placeholder || '请输入内容',
      tools: {
        // header: Header,
        // underline: Underline,
        // embed: Embed,
        // table: Table,
        // marker: Marker,
        // list: List,
        // warning: Warning,
        // code: Code,
        // linkTool: LinkTool,
        // image: Image,
        // raw: Raw,
        // quote: Quote,
        // checklist: CheckList,
        // delimiter: Delimiter,
        // inlineCode: InlineCode,
        // simpleImage: SimpleImage,
        ...props?.config?.tools,
      },
      inlineToolbar: true,
      /**
       * onChange callback
       */
      onChange: (api, event) => {
        console.log(LogTag, 'EditorJS onChange: ', event);
        editor
          .save()
          .then((outputData) => {
            console.log(LogTag, 'EditorJS: Article data: ', outputData);
            props?.onChange?.(outputData, event);
          })
          .catch((error) => {
            console.log(LogTag, 'EditorJS: Saving failed: ', error);
          });
      },
    });

    setEditor(editor);

    return () => {
      if (editor == null) return;
      setEditor(null);
    };
  }, []);

  useEffect(() => {
    if (editor) {
      if (props?.mode == 'read') {
        editor?.readOnly?.toggle(true);
      }
      if (props?.mode == 'edit') {
        editor?.readOnly?.toggle(false);
      }
    }
  }, [props?.mode, editor]);

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

  useEffect(() => {
    if (editor) {
    }
  }, [props?.text]);

  const renderFormItem = (_text: any, _props: ProFieldFCRenderProps, _dom: JSX.Element) => {
    console.log(LogTag, ' renderFormItem', _text, _props);
    return <div id={id} className="ItemEditorBox" style={{ ...props?.style }} />;
  };
  const render = (_text: any, _props: ProFieldFCRenderProps) => {
    console.log(LogTag, ' render', _text, _props);
    return <div id={id} className="ItemEditorBox" style={{ ...props?.style }} />;
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

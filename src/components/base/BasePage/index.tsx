import ProCard, { ProCardProps } from '@ant-design/pro-card';
import { PageContainer, PageContainerProps } from '@ant-design/pro-layout';
import { BackTop } from 'antd';
import React, { ReactNode } from 'react';
// import styles from './index.less';

export interface BasePageProps extends PageContainerProps {
  mode?: 'page' | 'drawer' | 'modal'; // 页面呈现类型
  title?: string | ReactNode; // 页面标题
  extra?: ReactNode | string; // 标题栏扩展按钮
  cardProps?: ProCardProps; // 内部card属性
}
const BasePage: React.FC<BasePageProps> = (props) => {
  const [mode] = React.useState(props.mode || 'page');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const intl = useIntl();

  return (
    <>
      {mode === 'page' ? (
        <PageContainer
          // className={styles.page}
          {...props}
          header={{
            title: props.title,
            extra: props.extra,
            onBack: () => window.history.back(),
            // todo面包屑待处理
            // breadcrumbRender: (_props: PageHeaderProps) => {
            //   const breadcrumb = _props?.breadcrumb;
            //   const routes = breadcrumb?.routes || [];
            //   const _routes = [
            //     {
            //       path: '/',
            //       breadcrumbName: '主页',
            //     },
            //     ...routes,
            //   ];
            //   return <Breadcrumb routes={_routes} />;
            // },
            ...props?.header,
          }}
        >
          {props?.cardProps === false ? (
            props.children
          ) : (
            <ProCard {...(props?.cardProps || {})}>{props.children}</ProCard>
          )}
          <BackTop />
        </PageContainer>
      ) : (
        <>
          {props?.cardProps === false ? (
            props.children
          ) : (
            <ProCard {...(props?.cardProps || {})}>{props.children}</ProCard>
          )}
          <BackTop />
        </>
      )}
    </>
  );
};

export default BasePage;

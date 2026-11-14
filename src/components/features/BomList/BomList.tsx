import React from 'react';
import type { BomItem } from '@cofoco/shared';
import { BomItemIcon } from '@cofoco/shared';
import styles from './BomList.module.css';

interface BomListProps {
  items: BomItem[];
}

export const BomList: React.FC<BomListProps> = ({ items }) => {
  return (
    <div className={styles.bomManifest}>
      <div className={styles.manifestHeader}>
        <h3 className={styles.heading}>BILL OF MATERIALS // TECHNICAL AUDIT</h3>
        <span className={styles.sub}>{items.length} SPECIMEN COMPONENTS</span>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>COMPONENT SPECIMEN</th>
            <th>SPECIFICATION & TOLERANCE</th>
            <th>MATERIAL</th>
            <th style={{ textAlign: 'right' }}>QTY</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.itemCol}>
                  <div className={styles.iconBox}>
                    <BomItemIcon iconName={item.iconName} size={20} />
                  </div>
                  <div className={styles.itemName}>{item.name}</div>
                </div>
              </td>
              <td>
                <div className={styles.itemSpec}>{item.spec}</div>
              </td>
              <td>
                <div className={styles.materialText}>{item.material}</div>
              </td>
              <td style={{ textAlign: 'right' }}>
                <span className={styles.qtyTag}>{item.qty}x</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
